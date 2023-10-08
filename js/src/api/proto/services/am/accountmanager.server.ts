// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/am/accountmanager.proto" (package "ubt.services.am", syntax proto3)
// tslint:disable
import { SignPayloadResponse } from "./accountmanager";
import { SignPayloadRequest } from "./accountmanager";
import { ListAccountsResponse } from "./accountmanager";
import { ListAccountsRequest } from "./accountmanager";
import { HasAccountResponse } from "./accountmanager";
import { HasAccountRequest } from "./accountmanager";
import { CreateAccountResponse } from "./accountmanager";
import { CreateAccountRequest } from "./accountmanager";
import { ServerCallContext } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ubt.services.am.UbtAccountManager
 */
export interface IUbtAccountManager<T = ServerCallContext> {
    /**
     * @generated from protobuf rpc: CreateAccount(ubt.services.am.CreateAccountRequest) returns (ubt.services.am.CreateAccountResponse);
     */
    createAccount(request: CreateAccountRequest, context: T): Promise<CreateAccountResponse>;
    /**
     * @generated from protobuf rpc: HasAccount(ubt.services.am.HasAccountRequest) returns (ubt.services.am.HasAccountResponse);
     */
    hasAccount(request: HasAccountRequest, context: T): Promise<HasAccountResponse>;
    /**
     * @generated from protobuf rpc: ListAccounts(ubt.services.am.ListAccountsRequest) returns (ubt.services.am.ListAccountsResponse);
     */
    listAccounts(request: ListAccountsRequest, context: T): Promise<ListAccountsResponse>;
    /**
     * @generated from protobuf rpc: SignPayload(ubt.services.am.SignPayloadRequest) returns (ubt.services.am.SignPayloadResponse);
     */
    signPayload(request: SignPayloadRequest, context: T): Promise<SignPayloadResponse>;
}