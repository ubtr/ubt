// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/construct.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { UbtConstructService } from "./construct";
import type { TransactionSendResponse } from "./construct";
import type { TransactionSendRequest } from "./construct";
import type { TransactionSignRequest } from "./construct";
import type { SignedTransaction } from "./construct";
import type { TransactionCombineRequest } from "./construct";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { TransactionIntent } from "./construct";
import type { CreateTransferRequest } from "./construct";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * *
 * Utilities for transaction creation, signing and sending
 *
 * @generated from protobuf service ubt.services.UbtConstructService
 */
export interface IUbtConstructServiceClient {
    /**
     * @generated from protobuf rpc: createTransfer(ubt.services.CreateTransferRequest) returns (ubt.services.TransactionIntent);
     */
    createTransfer(input: CreateTransferRequest, options?: RpcOptions): UnaryCall<CreateTransferRequest, TransactionIntent>;
    /**
     * @generated from protobuf rpc: combineTransaction(ubt.services.TransactionCombineRequest) returns (ubt.services.SignedTransaction);
     */
    combineTransaction(input: TransactionCombineRequest, options?: RpcOptions): UnaryCall<TransactionCombineRequest, SignedTransaction>;
    /**
     * @generated from protobuf rpc: signTransaction(ubt.services.TransactionSignRequest) returns (ubt.services.SignedTransaction);
     */
    signTransaction(input: TransactionSignRequest, options?: RpcOptions): UnaryCall<TransactionSignRequest, SignedTransaction>;
    /**
     * @generated from protobuf rpc: send(ubt.services.TransactionSendRequest) returns (ubt.services.TransactionSendResponse);
     */
    send(input: TransactionSendRequest, options?: RpcOptions): UnaryCall<TransactionSendRequest, TransactionSendResponse>;
}
/**
 * *
 * Utilities for transaction creation, signing and sending
 *
 * @generated from protobuf service ubt.services.UbtConstructService
 */
export class UbtConstructServiceClient implements IUbtConstructServiceClient, ServiceInfo {
    typeName = UbtConstructService.typeName;
    methods = UbtConstructService.methods;
    options = UbtConstructService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: createTransfer(ubt.services.CreateTransferRequest) returns (ubt.services.TransactionIntent);
     */
    createTransfer(input: CreateTransferRequest, options?: RpcOptions): UnaryCall<CreateTransferRequest, TransactionIntent> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateTransferRequest, TransactionIntent>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: combineTransaction(ubt.services.TransactionCombineRequest) returns (ubt.services.SignedTransaction);
     */
    combineTransaction(input: TransactionCombineRequest, options?: RpcOptions): UnaryCall<TransactionCombineRequest, SignedTransaction> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<TransactionCombineRequest, SignedTransaction>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: signTransaction(ubt.services.TransactionSignRequest) returns (ubt.services.SignedTransaction);
     */
    signTransaction(input: TransactionSignRequest, options?: RpcOptions): UnaryCall<TransactionSignRequest, SignedTransaction> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<TransactionSignRequest, SignedTransaction>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: send(ubt.services.TransactionSendRequest) returns (ubt.services.TransactionSendResponse);
     */
    send(input: TransactionSendRequest, options?: RpcOptions): UnaryCall<TransactionSendRequest, TransactionSendResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<TransactionSendRequest, TransactionSendResponse>("unary", this._transport, method, opt, input);
    }
}