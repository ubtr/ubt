import { RpcError, ServerCallContext } from "@protobuf-ts/runtime-rpc";
import { Currency } from "@ubt/sdk/dist/gen/models";
import { GetCurrencyRequest } from "@ubt/sdk/dist/gen/services/currencies";
import { IUbtCurrencyService } from "@ubt/sdk/dist/gen/services/currencies.server";
import { TronChains } from "../tronchains";
import { CurrencyId } from "@ubt/sdk";
import { TronContract } from "tronweb";
import { status as GrpcStatus } from "@grpc/grpc-js";
import log from "../log";
import { LogErrors } from "../decorators";

export const TRX_CURRENCY: Currency = {
  id: ":",
  symbol: "TRX",
  decimals: 6,
  capabilities: 0n
}

export class UbtCurrencyServiceImpl implements IUbtCurrencyService {
  private cache: Map<string, Currency> = new Map();
  constructor(readonly tronClients: TronChains) {}

  @LogErrors()
  async getCurrency(request: GetCurrencyRequest, context: ServerCallContext): Promise<Currency> {
    log.info("getCurrency: %O", request);
    const client = this.tronClients.mustGetClient(request.networkId);
    const currencyId = CurrencyId.fromString(request.id);
    
    if (currencyId.isNative()) {
      return TRX_CURRENCY;
    } else {
      const cached = this.cache.get(request.id);
      
      if (!cached) {
        if (currencyId.address) {
          if (!currencyId.tokenId) {
            const contract = await client.contract().at(currencyId.address);
            if (!contract) {
              throw new RpcError("Currency not found");
            }
            const symbol = await contract.methods.symbol().call();
            const decimals = await contract.methods.decimals().call();
            //const totalSupply = await contract.methods.totalSupply().call();
            const currency = {
              id: request.id,
              symbol: symbol,
              decimals: parseInt(decimals.toString()),
              capabilities: 0n
            }
            this.cache.set(request.id, currency);
            return currency;
          } else {
            // TRC-1155
            throw new RpcError("not implemented");
          }
        } else if (currencyId.tokenId) {
          // TRC-10 token
          throw new RpcError("not implemented");
        } else {
          throw new RpcError("invalid currency id");
        }
      } else {
        return cached;
      }
    }
  }

}