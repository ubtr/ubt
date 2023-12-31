// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/currencies.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { UbtCurrencyService } from "./currencies";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { Currency } from "../models";
import type { GetCurrencyRequest } from "./currencies";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ubt.services.UbtCurrencyService
 */
export interface IUbtCurrencyServiceClient {
    /**
     * @generated from protobuf rpc: getCurrency(ubt.services.GetCurrencyRequest) returns (ubt.Currency);
     */
    getCurrency(input: GetCurrencyRequest, options?: RpcOptions): UnaryCall<GetCurrencyRequest, Currency>;
}
/**
 * @generated from protobuf service ubt.services.UbtCurrencyService
 */
export class UbtCurrencyServiceClient implements IUbtCurrencyServiceClient, ServiceInfo {
    typeName = UbtCurrencyService.typeName;
    methods = UbtCurrencyService.methods;
    options = UbtCurrencyService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: getCurrency(ubt.services.GetCurrencyRequest) returns (ubt.Currency);
     */
    getCurrency(input: GetCurrencyRequest, options?: RpcOptions): UnaryCall<GetCurrencyRequest, Currency> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetCurrencyRequest, Currency>("unary", this._transport, method, opt, input);
    }
}
