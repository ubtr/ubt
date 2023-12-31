// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/currencies.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import { Currency } from "../models";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { ChainId } from "../models";
/**
 * @generated from protobuf message ubt.services.GetCurrencyRequest
 */
export interface GetCurrencyRequest {
    /**
     * @generated from protobuf field: ubt.ChainId chain_id = 1;
     */
    chainId?: ChainId;
    /**
     * @generated from protobuf field: string id = 2;
     */
    id: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class GetCurrencyRequest$Type extends MessageType<GetCurrencyRequest> {
    constructor() {
        super("ubt.services.GetCurrencyRequest", [
            { no: 1, name: "chain_id", kind: "message", T: () => ChainId },
            { no: 2, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<GetCurrencyRequest>): GetCurrencyRequest {
        const message = { id: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetCurrencyRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetCurrencyRequest): GetCurrencyRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.ChainId chain_id */ 1:
                    message.chainId = ChainId.internalBinaryRead(reader, reader.uint32(), options, message.chainId);
                    break;
                case /* string id */ 2:
                    message.id = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetCurrencyRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.ChainId chain_id = 1; */
        if (message.chainId)
            ChainId.internalBinaryWrite(message.chainId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string id = 2; */
        if (message.id !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.id);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.GetCurrencyRequest
 */
export const GetCurrencyRequest = new GetCurrencyRequest$Type();
/**
 * @generated ServiceType for protobuf service ubt.services.UbtCurrencyService
 */
export const UbtCurrencyService = new ServiceType("ubt.services.UbtCurrencyService", [
    { name: "getCurrency", options: {}, I: GetCurrencyRequest, O: Currency }
]);
