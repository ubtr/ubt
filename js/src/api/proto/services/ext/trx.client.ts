// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/ext/trx.proto" (package "ubt.services.ext", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Trx } from "./trx";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { TransactionInfoResponse } from "./trx";
import type { TransactionInfoRequest } from "./trx";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ubt.services.ext.Trx
 */
export interface ITrxClient {
    /**
     * return extended transaction info for tron, contains full fee amount while standard Transaction contains only energy part
     *
     * @generated from protobuf rpc: getTransactionInfo(ubt.services.ext.TransactionInfoRequest) returns (ubt.services.ext.TransactionInfoResponse);
     */
    getTransactionInfo(input: TransactionInfoRequest, options?: RpcOptions): UnaryCall<TransactionInfoRequest, TransactionInfoResponse>;
}
/**
 * @generated from protobuf service ubt.services.ext.Trx
 */
export class TrxClient implements ITrxClient, ServiceInfo {
    typeName = Trx.typeName;
    methods = Trx.methods;
    options = Trx.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * return extended transaction info for tron, contains full fee amount while standard Transaction contains only energy part
     *
     * @generated from protobuf rpc: getTransactionInfo(ubt.services.ext.TransactionInfoRequest) returns (ubt.services.ext.TransactionInfoResponse);
     */
    getTransactionInfo(input: TransactionInfoRequest, options?: RpcOptions): UnaryCall<TransactionInfoRequest, TransactionInfoResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<TransactionInfoRequest, TransactionInfoResponse>("unary", this._transport, method, opt, input);
    }
}