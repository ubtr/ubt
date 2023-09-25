import { hexutils } from "@ubt/sdk";
import log from "./log";

export interface TronLogEntry {
  logIndex: number;
  address: string;
  topics: string[];
  data: string;
  blockHash: string;
  blockNumber: bigint;
  transactionHash: string;
  transactionIndex: number;
}

export interface TronLog {
  address: string;
  topics: string[];
  data: string;
}

export interface TronLogBlock {
  number: bigint;
  hash: string;
  transactions: { [key in string]: TronLogTransaction };
}

export interface TronLogTransaction {
  hash: string;
  logs: TronLog[];
}

export type TronLogBlockGroup = { [key in string]: TronLogBlock };

export interface TransactionReceipt {
  blockHash: string;
  blockNumber: bigint;
  contractAddress: string;
  gasUsed: bigint;
  cumulativeGasUsed: bigint;
  effectiveGasPrice: bigint;
  from: string;
  to: string;
  status: number;
  transactionHash: string;
  transactionIndex: number;
  type: number;
}

export function mapTransactionReceipt(msg: any): TransactionReceipt {
  return {
    blockHash: msg.blockHash,
    blockNumber: BigInt(msg.blockNumber),
    contractAddress: msg.contractAddress,
    gasUsed: BigInt(msg.gasUsed),
    cumulativeGasUsed: BigInt(msg.cumulativeGasUsed),
    effectiveGasPrice: BigInt(msg.effectiveGasPrice),
    from: msg.from,
    to: msg.to,
    status: Number(BigInt(msg.status)),
    transactionHash: msg.transactionHash,
    transactionIndex: Number(BigInt(msg.transactionIndex)),
    type: Number(BigInt(msg.type)),
  };
}

export class TronJsonRpc {
  constructor(readonly jsonRpcUrl: string) {}

  async call<I, O>(method: string, params: I): Promise<O> {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: method,
      params: params,
    });
    log.trace("JsonRpc.call: %o", body);
    const res = await fetch(`${this.jsonRpcUrl}`, {
      method: "POST",
      body: body,
    });

    if (res.status !== 200) {
      throw new Error(`Failed: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.error) {
      throw new Error(json.error.message);
    }

    return json.result as O;
  }

  async sameMethodBatch<I, O>(method: string, params: I[]): Promise<(O | Error)[]> {
    const body = JSON.stringify(params.map((p, i) => ({
      jsonrpc: "2.0",
      id: i,
      method: method,
      params: p,
    })));
    log.trace("JsonRpc.sameMethodBatch: %o", body);
    const res = await fetch(`${this.jsonRpcUrl}`, {
      method: "POST",
      body: body,
    });
    if (res.status !== 200) {
      throw new Error(`Failed: ${res.statusText}`);
    }

    const json = await res.json();
    if (Array.isArray(json)) {
      return (json as any[]).map((r) => {
        if (r.error) {
          return new Error(r.error.message);
        }
        return r.result as O;
      });
    } else {
      throw new Error(`Failed: ${JSON.stringify(json)}`);
    }
  }

  async getLogs(blockId: string): Promise<TronLogEntry[]> {
    const res = await this.call("eth_getLogs", [{blockHash: blockId}]);
    return (res as any[]).map(
      (l) =>
        ({
          logIndex: hexutils.toNumber(l.logIndex),
          address: l.address,
          topics: l.topics,
          data: l.data,
          blockHash: l.blockHash,
          blockNumber: BigInt(l.blockNumber),
          transactionHash: l.transactionHash,
          transactionIndex: hexutils.toNumber(l.transactionIndex),
        } as TronLogEntry)
    );
  }

  group(logs: TronLogEntry[]): TronLogBlockGroup {
    const res: TronLogBlockGroup = {};
    for (const l of logs) {
      const blockId = l.blockHash;
      if (!res[blockId]) {
        res[blockId] = {
          number: l.blockNumber,
          hash: l.blockHash,
          transactions: {},
        };
      }
      const block = res[blockId];
      const txId = l.transactionHash;
      let tx = block.transactions.txId;
      if (!tx) {
        tx = {
          hash: txId,
          logs: [],
        };
        block.transactions[txId] = tx;
      }
      tx.logs.push({
        address: l.address,
        topics: l.topics,
        data: l.data,
      });
    }
    return res;
  }
}
