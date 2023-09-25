import { bytesutils, hexutils, maybeMap, uint256utils } from "@ubt/sdk";
import { Timestamp } from "@ubt/sdk/dist/gen/google/protobuf/timestamp";
import { FinalityStatus, NetworkId } from "@ubt/sdk/dist/gen/models";
import { UbtBlockServiceClient } from "@ubt/sdk/dist/gen/services/block.client";
import log from "../log";

const cbtTypesJsonSerializer = (c: any, value: any) => {
  if (typeof value === "bigint") return value.toString() + "n";
  else if (value instanceof Uint8Array) return "xxxxxx" + hexutils.fromBytes(value);
  else return value;
};

export async function listBlocksFrom(
  blockClient: UbtBlockServiceClient,
  netId: NetworkId,
  startNumber: bigint,
  count: number
) {
  let c = BigInt(count);
  let start = startNumber;
  while (c > 0) {
    const blocksReturned = await listBlocks(blockClient, netId, startNumber, BigInt(count));
    c -= blocksReturned;
    log(`c = ${c} blocksReturned = ${blocksReturned}`)
    start = start + blocksReturned;
  }
}

export async function listBlocks(
  blockClient: UbtBlockServiceClient,
  netId: NetworkId,
  startNumber: bigint,
  count?: bigint
): Promise<bigint> {
  console.log(`NET: ${netId.network}`)
  const blockRes = blockClient.listBlocks({
    networkId: netId,
    startNumber: startNumber,
    endNumber: count ? startNumber + count-1n: undefined,
    includes: 4,
    finalityStatus: FinalityStatus.FINALIZED,
  });
  let blocksReturned = 0n;
  for await (let response of blockRes.responses) {
    log("block: %s", JSON.stringify(response, cbtTypesJsonSerializer, 2));
    console.log(
      `#${response.header?.number} ${maybeMap(response.header?.id, hexutils.fromBytes)} ${
        response.header?.timestamp ? Timestamp.toDate(response.header?.timestamp).toISOString() : undefined
      } ${FinalityStatus[response.header?.finalityStatus ?? 0]} ${response.transactions.length} txs`
    );
    for (const tx of response.transactions) {
      console.log(` - TX '${hexutils.fromBytes(tx.id)}' from '${tx.from}' to '${tx.to}' fee: ${tx.fee ? uint256utils.toBigInt(tx.fee) : 0}`)
      for (const trf of tx.transfers) {
        console.log(
          ` -- TRF from '${trf.from}' to '${trf.to}' of ${
            trf.amount?.value ? uint256utils.toBigInt(trf.amount?.value) : undefined
          } (${trf.amount?.currencyId}) `
        );
      }
    }
    blocksReturned++;
  }
  return blocksReturned;
}
