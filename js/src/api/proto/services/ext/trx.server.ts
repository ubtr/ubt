// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/ext/trx.proto" (package "ubt.services.ext", syntax proto3)
// tslint:disable
import { TransactionInfoResponse } from "./trx";
import { TransactionInfoRequest } from "./trx";
import { ServerCallContext } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ubt.services.ext.Trx
 */
export interface ITrx<T = ServerCallContext> {
    /**
     * return extended transaction info for tron, contains full fee amount while standard Transaction contains only energy part
     *
     * @generated from protobuf rpc: getTransactionInfo(ubt.services.ext.TransactionInfoRequest) returns (ubt.services.ext.TransactionInfoResponse);
     */
    getTransactionInfo(request: TransactionInfoRequest, context: T): Promise<TransactionInfoResponse>;
}
