import {
  BlockRequest,
  DeriveAccountRequest,
  GetAccountRequest,
  ListBlocksRequest,
} from "@ubt/sdk/dist/gen/services/block";
import { IUbtBlockService } from "@ubt/sdk/dist/gen/services/block.server";
import { Account, Block, FinalityStatus, Transaction, Transfer } from "@ubt/sdk/dist/gen/models";
import TronWeb, { BlockInfo, BlockTransaction, TransactionInfo, Transaction as TronWebTransaction } from "tronweb";
import { status as GrpcStatus } from "@grpc/grpc-js";
import { RpcError, RpcInputStream, ServerCallContext } from "@protobuf-ts/runtime-rpc";
import { ChainInstance, TronChains } from "../tronchains";
import log from "../log";
import { bytesutils, hexutils, uint256utils } from "@ubt/sdk";
import { FINALIZED_HEIGHT } from "../constants";
import { LogErrors } from "../decorators";
import { TransactionReceipt, TronLogBlockGroup, mapTransactionReceipt } from "../TronJsonRpc";

const MAX_LIST_BLOCK_SIZE = 10n;

type TxConverter = (
  block: BlockInfo,
    tx: BlockTransaction,
    data: { logs: TronLogBlockGroup; receipts: TransactionReceipt[]},
    tron: TronWeb
) => Promise<Transaction>;

export class UbtBlockServiceImpl implements IUbtBlockService {
  constructor(readonly tronClients: TronChains) {}

  @LogErrors()
  async getBlock(req: BlockRequest): Promise<Block> {
    log.debug("getBlock: %o", req);
    try {
      const curBlockNumber = await this.tronClients.getLastKnownBlock(req.networkId).currentBlockNumber();
      const blockInfo = await this.tronClients.mustGetClient(req.networkId).trx.getBlockByHash(req.id);
      log.debug("blockInfo: %o", blockInfo);
      const chain = this.tronClients.mustGetChainInstance(req.networkId);
      const logs = chain.jsonRpc.group(await chain.jsonRpc.getLogs(req.id));
      return await this.convertBlock(curBlockNumber, blockInfo, chain);
    } catch (e) {
      console.error(e);
    }
    return null as any;
  }

  @LogErrors()
  async listBlocks(
    request: ListBlocksRequest,
    responses: RpcInputStream<Block>,
    context: ServerCallContext
  ): Promise<void> {
    log.trace("listBlocks: %o", request);

    const chainInstance = this.tronClients.mustGetChainInstance(request.networkId);

    const curBlockNumber = await this.tronClients.getLastKnownBlock(request.networkId).currentBlockNumber();
    log.trace("CurBlockNumber %s", curBlockNumber);
    if (!request.endNumber) {
      request.endNumber = curBlockNumber + 1n;
    }
    if (request.endNumber - request.startNumber > MAX_LIST_BLOCK_SIZE) {
      request.endNumber = request.startNumber + MAX_LIST_BLOCK_SIZE;
    }

    if (request.finalityStatus === FinalityStatus.FINALIZED) {
      const maxSafeBlock = curBlockNumber - BigInt(FINALIZED_HEIGHT);
      if (request.startNumber > maxSafeBlock) {
        throw new RpcError("No more safe blocks yet", GrpcStatus[GrpcStatus.OUT_OF_RANGE]);
      }
      if (request.endNumber > maxSafeBlock + 1n) {
        request.endNumber = maxSafeBlock + 1n;
      }
    }
    log.trace("listBlocksPreprocessed: %o", request);
    if (request.startNumber < request.endNumber) {
      const blocks = await chainInstance.client.trx.getBlockRange(
        Number(request.startNumber),
        Number(request.endNumber)
      );

      log.debug(`Converting ${blocks.length} blocks`);

      const convertedBlocks = [];

      for (const block of blocks) {
        const convertedBlock = this.convertBlock(curBlockNumber, block, chainInstance);
        convertedBlocks.push(convertedBlock);
      }

      const results = await Promise.all(convertedBlocks);

      // send converted blocks
      for (const cb of results) {
        responses.send(cb);
      }

      log.debug("completing");

      await responses.complete();
    } else {
      throw new RpcError("No more blocks yet", GrpcStatus[GrpcStatus.OUT_OF_RANGE]);
    }
  }

  private async convertBlock(curBlockNumber: bigint, block: BlockInfo, chain: ChainInstance): Promise<Block> {
    log.trace("Convert block %j", block);
    const blockNumber = BigInt(block.block_header.raw_data.number ?? 0);
    let fs: FinalityStatus = FinalityStatus.UNSAFE;
    if (curBlockNumber - blockNumber > FINALIZED_HEIGHT) {
      fs = FinalityStatus.FINALIZED;
    }

    const logs = chain.jsonRpc.group(await chain.jsonRpc.getLogs(block.blockID));
    log.trace("Logs: %o", logs);
    const transactions: Transaction[] = [];
    
    if (block.transactions) {
      const units: {tx: BlockTransaction, converter: TxConverter}[] = [];
      
      for (const tx of block.transactions) {
        const converter = this.getTxConverter(tx);
        if (converter) {
          units.push({tx, converter});
        }
      }

      const receiptsRaw = await chain.jsonRpc.sameMethodBatch("eth_getTransactionReceipt", units.map((u) => [u.tx.txID]));
      const receipts = receiptsRaw.map(mapTransactionReceipt);
      log.trace("Receipts: %o", receipts);

      const txPromises: Promise<Transaction | undefined>[] = [];
      
      for(const unit of units) {
        txPromises.push(unit.converter(block, unit.tx, {logs, receipts}, chain.client));
      }
      
      for (const tx of await Promise.all(txPromises)) {
        if (tx) {
          transactions.push(tx);
        }
      }
    }
    return {
      header: {
        id: hexutils.toBytes(block.blockID),
        number: blockNumber,
        parentId: hexutils.toBytes(block.block_header.raw_data.parentHash),
        timestamp: { seconds: BigInt(block.block_header.raw_data.timestamp ?? 0) / 1000n, nanos: 0 },
        finalityStatus: fs,
      },
      transactions: transactions,
    };
  }

  private getTxConverter(
    tx: BlockTransaction,
  ): (TxConverter | undefined) {
    const type = (tx.raw_data as any)?.contract?.[0]?.type;
    if (!type) {
      return undefined;
    }
    const converter = contractConverters[type];
    if (!converter) {
      return undefined;
    }
    //return await converter(block, tx, data, tron);
    return converter;
    //return null as any;
  }

  async getAccount(request: GetAccountRequest, context: ServerCallContext): Promise<Account> {
    const acc = await this.tronClients.mustGetClient(request.networkId).trx.getAccount(request.address.toString());
    let c: BlockTransaction;
    throw new Error("Method not implemented.");
  }

  async deriveAccount(request: DeriveAccountRequest, context: ServerCallContext): Promise<Account> {
    const address = TronWeb.utils.crypto.computeAddress(hexutils.toBytes(request.publicKey));
    return {
      id: TronWeb.address.fromHex(hexutils.fromBytes(address)),
      contractType: 0,
      isContract: false,
    };
  }

  /*private async convertTransaction(tx: BlockTransaction): Promise<Transaction> {
    return {
      id: tx.txID,
      blockId: tx.raw_data.ref_block_hash,
      timestamp: tx.raw_data.timestamp,
      fee: tx.raw_data.fee,
      sender: tx.raw_data.contract[0].parameter.value.owner_address,
      receiver: tx.raw_data.contract[0].parameter.value.to_address,
      amount: tx.raw_data.contract[0].parameter.value.amount,
      data: tx.raw_data.contract[0].parameter.value.data,
      signature: tx.signature[0],
    };
  }*/
}

const contractConverters: {
  [key: string]: TxConverter;
} = {};

contractConverters["TransferContract"] = async (block, tx, {logs, receipts}): Promise<Transaction> => {
  const tronCurId = ":";
  const parameterValue: { owner_address: string; to_address: string; amount: number } | undefined = (tx.raw_data as any)
    ?.contract?.[0].parameter?.value;
  if (!parameterValue) {
    throw new Error("Invalid transaction");
  }
  const receipt = receipts.find(r => r.transactionHash.endsWith(tx.txID));
  return {
    id: hexutils.toBytes(tx.txID),
    blockId: hexutils.toBytes(block.blockID),
    idx: 0,
    from: TronWeb.address.fromHex(parameterValue.owner_address),
    to: TronWeb.address.fromHex(parameterValue.to_address),
    type: 0,
    fee: uint256utils.fromBigInt(receipt ? receipt.gasUsed * receipt.effectiveGasPrice : 0n),
    operations: [],
    transfers: [
      {
        from: TronWeb.address.fromHex(parameterValue.owner_address),
        to: TronWeb.address.fromHex(parameterValue.to_address),
        amount: {
          currencyId: tronCurId,
          value: uint256utils.fromNumber(parameterValue.amount),
        },
        id: hexutils.toBytes(tx.txID),
        opId: bytesutils.fromNumber(0),
        txId: hexutils.toBytes(tx.txID),
        status: 0,
      },
    ],
  };
};

interface LogRecord {
  address: string;
  topics: string[];
  data: string;
}

const trc20Transfer = "ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"; //Transfer(address,address,uint256)

function decodeLogsAsTransfers(txId: string, idx: number, logR: LogRecord): Transfer {
  log.trace("Log: %o", logR)
  const cur = TronWeb.address.fromHex("41" + (logR.address.startsWith("0x") ? logR.address.substring(2) : logR.address)) + ":";
  const topic1 = logR.topics[1].startsWith("0x") ? logR.topics[1].substring(2) : logR.topics[1];
  const topic2 = logR.topics[2].startsWith("0x") ? logR.topics[2].substring(2) : logR.topics[2];
  return {
    id: bytesutils.concat(hexutils.toBytes(txId), bytesutils.fromNumber(idx)),
    txId: hexutils.toBytes(txId),
    opId: new Uint8Array([0]),
    from: TronWeb.address.fromHex("41" + topic1.substring(topic1.length - 40)),
    to: TronWeb.address.fromHex("41" + topic2.substring(topic2.length - 40)),
    amount: { currencyId: cur, value: logR.data ? uint256utils.fromHexString(logR.data) : undefined },
    status: 0,
  };
}

contractConverters["TriggerSmartContract"] = async (block, tx, {logs, receipts}, tron): Promise<Transaction> => {
  //const txInfo = (await tron.trx.getTransactionInfo(tx.txID)) as TransactionInfo;

  log.trace("Tx: %o", tx);
  //log.trace("TxInfo: %o", txInfo);

  const parameterValue: { owner_address: string; contract_address: string; amount: string } | undefined = (
    tx.raw_data as any
  )?.contract?.[0].parameter?.value;
  if (!parameterValue) {
    throw new Error("Invalid transaction");
  }

  const transfers: Transfer[] = [];

  if (logs["0x"+block.blockID]?.transactions["0x" + tx.txID]) {
    let i = 0;
    for (const l of logs["0x"+block.blockID]?.transactions["0x" + tx.txID].logs as LogRecord[]) {
      if (l && l.topics && l.topics[0] && l.topics[0].endsWith(trc20Transfer) && l.topics.length > 2) {
        transfers.push(decodeLogsAsTransfers(tx.txID, i, l));
      }
      i++;
    }
  }

  const receipt = receipts.find(r => r.transactionHash.endsWith(tx.txID));
  const fee = receipt ? receipt.gasUsed * receipt.effectiveGasPrice : 0n;
  log.trace(`Fee: ${fee}, receipt %o`, receipt)
  return {
    id: hexutils.toBytes(tx.txID),
    blockId: hexutils.toBytes(block.blockID),
    idx: 0,
    from: TronWeb.address.fromHex(parameterValue.owner_address),
    to: TronWeb.address.fromHex(parameterValue.contract_address),
    type: 0,
    fee: uint256utils.fromBigInt(fee), //FIXME get actual fee
    operations: [],
    transfers: transfers,
  };
};
