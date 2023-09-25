import { status } from "@grpc/grpc-js";

import { NetworkId, Network, Network_NetworkSupportedServices } from "@ubt/sdk/dist/gen/models";

import { RpcError, RpcInputStream, ServerCallContext } from "@protobuf-ts/runtime-rpc";
import { TronChains } from "../tronchains";
import { IUbtNetworkService } from "@ubt/sdk/dist/gen/services/network.server";
import { ListNetworksRequest } from "@ubt/sdk/dist/gen/services/network";
import { NETWORK_TYPE } from "../constants";
import { LogErrors } from "../decorators";

const SUPPORTED_SERVICES = [Network_NetworkSupportedServices.BLOCK, Network_NetworkSupportedServices.CONSTRUCT];

export class UbtNetworkServiceImpl implements IUbtNetworkService {
  constructor(readonly tron: TronChains) {}

  @LogErrors()
  async getNetwork(netId: NetworkId, ctx: ServerCallContext): Promise<Network> {
    const netConf = this.tron.getChainInstance(netId);
    if (netId.network !== NETWORK_TYPE || !netConf) {
      throw new RpcError(`Network ${netId.type}:${netId.network} does not exist`, status.NOT_FOUND.toString());
    }

    return {
      id: netId,
      testnet: true,
      finalizedHeight: 20,
      msPerBlock: netConf.config.msPerBlock ?? 0,
      supportedServices: SUPPORTED_SERVICES,
      explorer: netConf.config.explorerUrls,
    };
  }

  @LogErrors()
  async listNetworks(
    request: ListNetworksRequest,
    responses: RpcInputStream<Network>,
    ctx: ServerCallContext
  ): Promise<void> {
    if (request.type && request.type !== NETWORK_TYPE) {
      responses.complete();
      return;
    }
    for (let [name, instance] of Object.entries(this.tron.clients)) {
      const res: Network = {
        id: { type: NETWORK_TYPE, network: name },
        testnet: instance.config.testnet ?? false,
        finalizedHeight: 20,
        msPerBlock: instance.config.msPerBlock ?? 0,
        supportedServices: SUPPORTED_SERVICES,
        explorer: instance.config.explorerUrls,
      };
      await responses.send(res);
    }
    await responses.complete();
  }
}
