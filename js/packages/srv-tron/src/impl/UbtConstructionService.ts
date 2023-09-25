import { RpcError, ServerCallContext } from "@protobuf-ts/runtime-rpc";
import {
  CreateTransferRequest,
  TransactionIntent,
  TransactionSignRequest,
  SignedTransaction,
  TransactionCombineRequest,
  TransactionSendResponse,
  TransactionSendRequest,
} from "@ubt/sdk/dist/gen/services/construct";
import { IUbtConstructService } from "@ubt/sdk/dist/gen/services/construct.server";
import { ChainParameters, TronChains } from "../tronchains";
import TronWeb, { Transaction, TriggerConstantContractResult } from "tronweb";
import { CurrencyId, bytesutils, hexutils, uint256utils } from "@ubt/sdk";
import log from "../log";
import { SIGNATURE_TYPE } from "../constants";
import { LogErrors } from "../decorators";

const TRC20_FUNCTION_SELECTOR = "transfer(address,uint256)"

export class UbtConstructionServiceImpl implements IUbtConstructService {
  constructor(readonly tronClients: TronChains) {}

  private estimateFee(energyEstimate: bigint, bandwidthEstimate: bigint, parameters?: ChainParameters): bigint {
    if (!parameters) {
      return 0n;
    }
    // TODO: currently max possible (without free resources)
    log.debug(`estimateFee e:${energyEstimate} e_price:${parameters.getEnergyFee} b:${bandwidthEstimate} b_price: ${parameters.getTransactionFee}`)
    return energyEstimate * parameters.getEnergyFee + bandwidthEstimate * parameters.getTransactionFee;
  }

  @LogErrors()
  async createTransfer(req: CreateTransferRequest, context: ServerCallContext): Promise<TransactionIntent> {
    log.info("createTransfer: %O", req);
    const options = {
      feeLimit: 50_000_000,
      callValue: 0,
    };
    if (!req.amount?.value) {
      throw new Error("Amount is required");
    }

    const client = this.tronClients.mustGetClient(req.networkId);

    const amt = req.amount?.value;
    const currency = CurrencyId.fromString(req.amount?.currencyId);

    const val = uint256utils.toBigInt(amt);
    log.info(`Amount: ${val}`);
    if (currency.isNative()) {
     const tx: Transaction = (await client.transactionBuilder.sendTrx(TronWeb.address.toHex(req.to), Number(val), TronWeb.address.toHex(req.from))) as Transaction;
     log.info("TX: %o", tx)
     const bandwidthEstimate = 265n; //FIXME
     const feeEstimate = this.estimateFee(0n, bandwidthEstimate, this.tronClients.clients[req.networkId?.network ?? ""]?.parameters)
     return {
      id: hexutils.toBytes(tx.txID),
      payloadToSign: hexutils.toBytes(tx.txID),
      signatureType: SIGNATURE_TYPE,
      estimatedFee: uint256utils.fromBigInt(feeEstimate),
      rawData: new TextEncoder().encode(JSON.stringify(tx)),
    };
    } else if (currency.isErc20Like()) {
      const tx: TriggerConstantContractResult = (await client
        .transactionBuilder.triggerSmartContract(
          currency.address,
          TRC20_FUNCTION_SELECTOR,
          options,
          [
            {
              type: "address",
              value: TronWeb.address.toHex(req.to),
            },
            {
              type: "uint256",
              value: val,
            },
          ],
          TronWeb.address.toHex(req.from)
        )) as TriggerConstantContractResult;
      log.info("TX: %O", tx);

      // calculate energy
      let energyEstimate: bigint = 0n;

      if (currency.address !== "") {
        const estimateRes = (await client.transactionBuilder.triggerConstantContract(currency.address, TRC20_FUNCTION_SELECTOR, {estimateEnery: true}, [
          {
            type: "address",
            value: TronWeb.address.toHex(req.to),
          },
          {
            type: "uint256",
            value: val,
          },
        ],
        TronWeb.address.toHex(req.from))) as TriggerConstantContractResult;
        
        energyEstimate = BigInt(estimateRes.energy_used)
      }

      log.info("Energy calculated")

      // calculated bandwidth
      const bandwidthEstimate = 339n; // FIXME: same for TRC20 but need to calculate

      const feeEstimate = this.estimateFee(energyEstimate, bandwidthEstimate, this.tronClients.clients[req.networkId?.network ?? ""]?.parameters)


      log.info("returning %o", tx.transaction.txID);
      return {
        id: hexutils.toBytes(tx.transaction.txID),
        payloadToSign: hexutils.toBytes(tx.transaction.txID),
        signatureType: SIGNATURE_TYPE,
        estimatedFee: uint256utils.fromBigInt(feeEstimate),
        rawData: new TextEncoder().encode(JSON.stringify(tx.transaction)),
      };
    } else {
      throw new RpcError("Unsupported currency");
    }
  }

  @LogErrors()
  async combineTransaction(req: TransactionCombineRequest, context: ServerCallContext): Promise<SignedTransaction> {
    if (!req.intent?.payloadToSign) {
      throw new Error("Intent data is required");
    }
    const res = await this.tronClients
      .mustGetClient(req.networkId)
      .trx.verifyMessageV2(
        hexutils.fromBytes(req.intent?.payloadToSign),
        hexutils.fromBytes(req.signatures[0])
      );
    log.debug(res);
    return { intent: req.intent, signatures: req.signatures };
  }

  @LogErrors()
  async signTransaction(request: TransactionSignRequest, context: ServerCallContext): Promise<SignedTransaction> {
    if (!request.intent?.payloadToSign) {
      throw new Error("Intent data is required");
    }
    const signedTx = (await this.tronClients
      .mustGetClient(request.networkId)
      .trx.sign(
        JSON.parse(new TextDecoder().decode(request.intent?.rawData)),
        hexutils.fromBytes(request.privateKey)
      )) as any;
    return {
      intent: request.intent,
      signatures: signedTx.signature.map((s: string) => hexutils.toBytes(s)),
    };
  }

  @LogErrors()
  async send(request: TransactionSendRequest, context: ServerCallContext): Promise<TransactionSendResponse> {
    if (!request.intent?.rawData) {
      throw new Error("Intent data is required");
    }
    const tx = JSON.parse(new TextDecoder().decode(request.intent?.rawData));

    const res = await this.tronClients.mustGetClient(request.networkId).trx.sendRawTransaction({
      ...tx,
      signature: request.signatures.map((s) => hexutils.fromBytes(s)),
    });
    if ((res as any).result) {
      log.debug("Send success %o", res)
      return {
        id: (res as any).transaction.txID,
      };
    } else {
      const anyRes = res as any;
      if (anyRes.message) {
        throw new RpcError( this.tronClients.mustGetClient(request.networkId).toUtf8(anyRes.message));
      } else if (anyRes.code) {
        throw new RpcError(anyRes.code);
      }else {
        throw new RpcError("Failed to send transaction");
      } 
    }
  }
}
