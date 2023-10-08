// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/block.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import { DeriveAccountRequest } from "./block";
import { Account } from "../models";
import { GetAccountRequest } from "./block";
import { RpcInputStream } from "@protobuf-ts/runtime-rpc";
import { ListBlocksRequest } from "./block";
import { Block } from "../models";
import { BlockRequest } from "./block";
import { ServerCallContext } from "@protobuf-ts/runtime-rpc";
/**
 * *
 * Simple access to block and block information. In most cases does not require any indexing/storage to implement
 *
 * @generated from protobuf service ubt.services.UbtBlockService
 */
export interface IUbtBlockService<T = ServerCallContext> {
    /**
     *  Fetch block by ID
     *
     * @generated from protobuf rpc: getBlock(ubt.services.BlockRequest) returns (ubt.Block);
     */
    getBlock(request: BlockRequest, context: T): Promise<Block>;
    /**
     * List blocks in range
     *
     * @generated from protobuf rpc: listBlocks(ubt.services.ListBlocksRequest) returns (stream ubt.Block);
     */
    listBlocks(request: ListBlocksRequest, responses: RpcInputStream<Block>, context: T): Promise<void>;
    /**
     * get account
     *
     * @generated from protobuf rpc: getAccount(ubt.services.GetAccountRequest) returns (ubt.Account);
     */
    getAccount(request: GetAccountRequest, context: T): Promise<Account>;
    /**
     * return account/address by public key
     *
     * @generated from protobuf rpc: deriveAccount(ubt.services.DeriveAccountRequest) returns (ubt.Account);
     */
    deriveAccount(request: DeriveAccountRequest, context: T): Promise<Account>;
}