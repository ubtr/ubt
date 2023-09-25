import TronWeb, { ChainParameter } from "tronweb";

import config from "config";
import { NetworkId } from "@ubt/sdk/dist/gen/models";
import { NETWORK_TYPE, SEC_PER_BLOCK } from "./constants";
import log from "./log";
import { RateLimiter, applyLimit } from "./ratelimiter";
import { TronJsonRpc } from "./TronJsonRpc";

/**
 * Attempt to predict current block number instead of querying it from the node.
 * This may save couple of thousands requests per day.
 */
export class LastKnownBlock {
  private num?: bigint;
  private timestamp?: number;

  constructor(private client: TronWeb) {}

  async currentBlockNumber(): Promise<bigint> {
    if (this.num === undefined || this.timestamp === undefined || Date.now() - this.timestamp > 1000 * SEC_PER_BLOCK) {
      const block = await this.client.trx.getCurrentBlock();
      this.num = block.block_header.raw_data.number ? BigInt(block.block_header.raw_data.number) : undefined;
      this.timestamp = block.block_header.raw_data.timestamp;
      log.debug(`LastKnownBlock: ${this.num}`);
      return this.num!;
    }
    return this.num!;
  }

  checkAndUpdateLastBlock(num?: bigint, timestamp?: number) {
    if (num == undefined || timestamp == undefined) {
      return;
    }
    if (this.num === undefined || this.timestamp === undefined) {
      this.num = num;
      this.timestamp = timestamp;
      return;
    }
    if (num > this.num) {
      this.num = num;
      this.timestamp = timestamp;
    }
  }
}

export interface NetworkExplorerUrls {
  txUrl: string;
  addressUrl: string;
  blockUrl: string;
}

export interface ChainConfig {
  rpcUrl: string;
  jsonRpcUrl: string;
  explorerUrls?: NetworkExplorerUrls;
  msPerBlock?: number;
  testnet?: boolean;
  limitPerSec?: number;
}

export type ChainsConfig = { [key: string]: ChainConfig };

export interface ChainParameters {
  getEnergyFee: bigint;
  getTransactionFee: bigint;
}

const CHAIN_PARAMS_UPDATE_INTERVAL = 10 * 60 * 60 * 1000; // every 10 hours

export class ChainInstance {
  lastKnownBlock: LastKnownBlock;
  parameters?: ChainParameters;
  jsonRpc: TronJsonRpc;
  private rl: RateLimiter;
  constructor(readonly network: string, readonly config: ChainConfig, readonly client: TronWeb) {
    log.info(
      "Network %s limitPerSec=%o",
      network,
      config.limitPerSec ?? 0
    );

    this.rl = new RateLimiter(1000, config.limitPerSec).start();

    this.jsonRpc = new TronJsonRpc(config.jsonRpcUrl);
    applyLimit(this.jsonRpc, "getLogs", this.rl);

    applyLimit(this.client.trx, "getBlockRange", this.rl);
    applyLimit(this.client.trx, "getTransactionInfo", this.rl);
    applyLimit(this.client.trx, "getCurrentBlock", this.rl);
    this.lastKnownBlock = new LastKnownBlock(client);
    this.updateChainParams();
  }

  private async updateChainParams() {
    const cp = await this.client.trx.getChainParameters();
    const cpObj: any = {};
    for (const p of cp) {
      try {
        cpObj[p.key] = BigInt(p.value);
      } catch (e) {
        //ignore conversion error
      }
    }
    this.parameters = cpObj as ChainParameters;
    log.info(`Chain '${this.network}' parameters updated: %O`, this.parameters);

    // update last known block
    const curBlock = await this.client.trx.getCurrentBlock();
    //this.lastKnownBlock.currentBlockNumber = curBlock;

    setTimeout(() => this.updateChainParams(), CHAIN_PARAMS_UPDATE_INTERVAL);
  }
}

type ClientsMap = { [key: string]: ChainInstance };

export class TronChains {
  readonly clients: ClientsMap = {};
  readonly defaultNetwork: string;
  constructor(config: ChainsConfig, defaultNetwork: string) {
    for (const instName of Object.keys(config)) {
      const client = new TronWeb({ fullHost: config[instName].rpcUrl });
      client.setAddress("TKLmAbR6YzEBmqAtLHYX3QrzoEiupNTLYH");
      this.clients[instName] = new ChainInstance(instName, config[instName], client);
    }

    this.defaultNetwork = defaultNetwork;
  }

  getChainInstance(network?: NetworkId): ChainInstance | undefined {
    if (network?.type && network?.type !== NETWORK_TYPE) {
      return undefined;
    }
    return network?.network ? this.clients[network.network] : undefined;
  }

  getChainInstanceOrDefault(network?: NetworkId): ChainInstance | undefined {
    if (network?.type && network?.type !== NETWORK_TYPE) {
      return undefined;
    }
    return network?.network ? this.clients[network.network] : this.clients[this.defaultNetwork];
  }

  mustGetChainInstance(network?: NetworkId): ChainInstance {
    const chain = this.getChainInstanceOrDefault(network);
    if (!chain) {
      throw new Error(`Network '${network?.type}:${network?.network}' not found`);
    }
    return chain;
  }

  getClient(network?: NetworkId): TronWeb | undefined {
    if (network?.type && network?.type !== NETWORK_TYPE) {
      return undefined;
    }
    return network?.network ? this.clients[network.network]?.client : this.clients[this.defaultNetwork]?.client;
  }

  getLastKnownBlock(network?: NetworkId): LastKnownBlock {
    return network?.network
      ? this.clients[network.network].lastKnownBlock
      : this.clients[this.defaultNetwork].lastKnownBlock;
  }

  mustGetClient(network?: NetworkId): TronWeb {
    const client = this.getClient(network);
    if (!client) {
      throw new Error(`Network '${network?.type}:${network?.network}' not found`);
    }
    return client;
  }
}

export function createClients(): TronChains {
  const instancesConfig: ChainsConfig = config.get<ChainsConfig>("networks");
  const defaultNetwork: string = config.get<string>("defaultNetwork");

  return new TronChains(instancesConfig, defaultNetwork);
}
