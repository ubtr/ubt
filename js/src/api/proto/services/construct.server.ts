// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/construct.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import { TransactionSendResponse } from "./construct";
import { TransactionSendRequest } from "./construct";
import { TransactionSignRequest } from "./construct";
import { SignedTransaction } from "./construct";
import { TransactionCombineRequest } from "./construct";
import { TransactionIntent } from "./construct";
import { CreateTransferRequest } from "./construct";
import { ServerCallContext } from "@protobuf-ts/runtime-rpc";
/**
 * *
 * Utilities for transaction creation, signing and sending
 *
 * @generated from protobuf service ubt.services.UbtConstructService
 */
export interface IUbtConstructService<T = ServerCallContext> {
    /**
     * @generated from protobuf rpc: createTransfer(ubt.services.CreateTransferRequest) returns (ubt.services.TransactionIntent);
     */
    createTransfer(request: CreateTransferRequest, context: T): Promise<TransactionIntent>;
    /**
     * combine transaction with signatures
     *
     * @generated from protobuf rpc: combineTransaction(ubt.services.TransactionCombineRequest) returns (ubt.services.SignedTransaction);
     */
    combineTransaction(request: TransactionCombineRequest, context: T): Promise<SignedTransaction>;
    /**
     * sign transaction with private key; tx can also be signed offline and used directly in 'send'
     *
     * @generated from protobuf rpc: signTransaction(ubt.services.TransactionSignRequest) returns (ubt.services.SignedTransaction);
     */
    signTransaction(request: TransactionSignRequest, context: T): Promise<SignedTransaction>;
    /**
     * send signed transaction to the network
     *
     * @generated from protobuf rpc: send(ubt.services.TransactionSendRequest) returns (ubt.services.TransactionSendResponse);
     */
    send(request: TransactionSendRequest, context: T): Promise<TransactionSendResponse>;
}
