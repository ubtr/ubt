// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/construct.proto" (package "ubt.services", syntax proto3)
// tslint:disable
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
import { uint256 } from "../commons";
import { CurrencyAmount } from "../models";
import { ChainId } from "../models";
/**
 * @generated from protobuf message ubt.services.CreateTransferRequest
 */
export interface CreateTransferRequest {
    /**
     * @generated from protobuf field: ubt.ChainId chain_id = 1;
     */
    chainId?: ChainId;
    /**
     * @generated from protobuf field: string from = 2;
     */
    from: string;
    /**
     * @generated from protobuf field: string to = 3;
     */
    to: string;
    /**
     * @generated from protobuf field: ubt.CurrencyAmount amount = 4;
     */
    amount?: CurrencyAmount;
}
/**
 * @generated from protobuf message ubt.services.TransferReceiver
 */
export interface TransferReceiver {
    /**
     * @generated from protobuf field: string to = 1;
     */
    to: string;
    /**
     * @generated from protobuf field: ubt.CurrencyAmount amount = 2;
     */
    amount?: CurrencyAmount;
}
/**
 * @generated from protobuf message ubt.services.CreateBatchTransferRequest
 */
export interface CreateBatchTransferRequest {
    /**
     * @generated from protobuf field: string from = 1;
     */
    from: string; // TODO utxo
    /**
     * @generated from protobuf field: repeated ubt.services.TransferReceiver to = 2;
     */
    to: TransferReceiver[];
}
/**
 * @generated from protobuf message ubt.services.TransactionIntent
 */
export interface TransactionIntent {
    /**
     * @generated from protobuf field: bytes id = 1;
     */
    id: Uint8Array;
    /**
     * @generated from protobuf field: bytes payload_to_sign = 2;
     */
    payloadToSign: Uint8Array; // prepared byte payload to sign
    /**
     * @generated from protobuf field: string signature_type = 3;
     */
    signatureType: string; // type of the signature client must use to sign the payload
    /**
     * @generated from protobuf field: ubt.uint256 estimated_fee = 4;
     */
    estimatedFee?: uint256; // estimated fee for the transaction TODO: drilldown by fee components and their price
    /**
     * @generated from protobuf field: bytes raw_data = 5;
     */
    rawData: Uint8Array; // raw transaction data
}
/**
 * @generated from protobuf message ubt.services.TransactionCombineRequest
 */
export interface TransactionCombineRequest {
    /**
     * @generated from protobuf field: ubt.ChainId chain_id = 1;
     */
    chainId?: ChainId;
    /**
     * @generated from protobuf field: ubt.services.TransactionIntent intent = 2;
     */
    intent?: TransactionIntent;
    /**
     * @generated from protobuf field: repeated bytes signatures = 3;
     */
    signatures: Uint8Array[];
}
/**
 * @generated from protobuf message ubt.services.TransactionSignRequest
 */
export interface TransactionSignRequest {
    /**
     * @generated from protobuf field: ubt.ChainId chain_id = 1;
     */
    chainId?: ChainId;
    /**
     * @generated from protobuf field: ubt.services.TransactionIntent intent = 2;
     */
    intent?: TransactionIntent;
    /**
     * @generated from protobuf field: bytes private_key = 3;
     */
    privateKey: Uint8Array;
}
/**
 * @generated from protobuf message ubt.services.TransactionSendRequest
 */
export interface TransactionSendRequest {
    /**
     * @generated from protobuf field: ubt.ChainId chain_id = 1;
     */
    chainId?: ChainId;
    /**
     * @generated from protobuf field: ubt.services.TransactionIntent intent = 2;
     */
    intent?: TransactionIntent;
    /**
     * @generated from protobuf field: repeated bytes signatures = 3;
     */
    signatures: Uint8Array[];
}
/**
 * @generated from protobuf message ubt.services.SignedTransaction
 */
export interface SignedTransaction {
    /**
     * @generated from protobuf field: ubt.services.TransactionIntent intent = 1;
     */
    intent?: TransactionIntent;
    /**
     * @generated from protobuf field: repeated bytes signatures = 2;
     */
    signatures: Uint8Array[];
}
/**
 * @generated from protobuf message ubt.services.TransactionSendResponse
 */
export interface TransactionSendResponse {
    /**
     * @generated from protobuf field: bytes id = 1;
     */
    id: Uint8Array;
}
// @generated message type with reflection information, may provide speed optimized methods
class CreateTransferRequest$Type extends MessageType<CreateTransferRequest> {
    constructor() {
        super("ubt.services.CreateTransferRequest", [
            { no: 1, name: "chain_id", kind: "message", T: () => ChainId },
            { no: 2, name: "from", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "to", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "amount", kind: "message", T: () => CurrencyAmount }
        ]);
    }
    create(value?: PartialMessage<CreateTransferRequest>): CreateTransferRequest {
        const message = { from: "", to: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateTransferRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateTransferRequest): CreateTransferRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.ChainId chain_id */ 1:
                    message.chainId = ChainId.internalBinaryRead(reader, reader.uint32(), options, message.chainId);
                    break;
                case /* string from */ 2:
                    message.from = reader.string();
                    break;
                case /* string to */ 3:
                    message.to = reader.string();
                    break;
                case /* ubt.CurrencyAmount amount */ 4:
                    message.amount = CurrencyAmount.internalBinaryRead(reader, reader.uint32(), options, message.amount);
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
    internalBinaryWrite(message: CreateTransferRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.ChainId chain_id = 1; */
        if (message.chainId)
            ChainId.internalBinaryWrite(message.chainId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string from = 2; */
        if (message.from !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.from);
        /* string to = 3; */
        if (message.to !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.to);
        /* ubt.CurrencyAmount amount = 4; */
        if (message.amount)
            CurrencyAmount.internalBinaryWrite(message.amount, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.CreateTransferRequest
 */
export const CreateTransferRequest = new CreateTransferRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransferReceiver$Type extends MessageType<TransferReceiver> {
    constructor() {
        super("ubt.services.TransferReceiver", [
            { no: 1, name: "to", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "amount", kind: "message", T: () => CurrencyAmount }
        ]);
    }
    create(value?: PartialMessage<TransferReceiver>): TransferReceiver {
        const message = { to: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransferReceiver>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransferReceiver): TransferReceiver {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string to */ 1:
                    message.to = reader.string();
                    break;
                case /* ubt.CurrencyAmount amount */ 2:
                    message.amount = CurrencyAmount.internalBinaryRead(reader, reader.uint32(), options, message.amount);
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
    internalBinaryWrite(message: TransferReceiver, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string to = 1; */
        if (message.to !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.to);
        /* ubt.CurrencyAmount amount = 2; */
        if (message.amount)
            CurrencyAmount.internalBinaryWrite(message.amount, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransferReceiver
 */
export const TransferReceiver = new TransferReceiver$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreateBatchTransferRequest$Type extends MessageType<CreateBatchTransferRequest> {
    constructor() {
        super("ubt.services.CreateBatchTransferRequest", [
            { no: 1, name: "from", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "to", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => TransferReceiver }
        ]);
    }
    create(value?: PartialMessage<CreateBatchTransferRequest>): CreateBatchTransferRequest {
        const message = { from: "", to: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CreateBatchTransferRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateBatchTransferRequest): CreateBatchTransferRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string from */ 1:
                    message.from = reader.string();
                    break;
                case /* repeated ubt.services.TransferReceiver to */ 2:
                    message.to.push(TransferReceiver.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: CreateBatchTransferRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string from = 1; */
        if (message.from !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.from);
        /* repeated ubt.services.TransferReceiver to = 2; */
        for (let i = 0; i < message.to.length; i++)
            TransferReceiver.internalBinaryWrite(message.to[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.CreateBatchTransferRequest
 */
export const CreateBatchTransferRequest = new CreateBatchTransferRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransactionIntent$Type extends MessageType<TransactionIntent> {
    constructor() {
        super("ubt.services.TransactionIntent", [
            { no: 1, name: "id", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "payload_to_sign", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 3, name: "signature_type", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "estimated_fee", kind: "message", T: () => uint256 },
            { no: 5, name: "raw_data", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<TransactionIntent>): TransactionIntent {
        const message = { id: new Uint8Array(0), payloadToSign: new Uint8Array(0), signatureType: "", rawData: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransactionIntent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransactionIntent): TransactionIntent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes id */ 1:
                    message.id = reader.bytes();
                    break;
                case /* bytes payload_to_sign */ 2:
                    message.payloadToSign = reader.bytes();
                    break;
                case /* string signature_type */ 3:
                    message.signatureType = reader.string();
                    break;
                case /* ubt.uint256 estimated_fee */ 4:
                    message.estimatedFee = uint256.internalBinaryRead(reader, reader.uint32(), options, message.estimatedFee);
                    break;
                case /* bytes raw_data */ 5:
                    message.rawData = reader.bytes();
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
    internalBinaryWrite(message: TransactionIntent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes id = 1; */
        if (message.id.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.id);
        /* bytes payload_to_sign = 2; */
        if (message.payloadToSign.length)
            writer.tag(2, WireType.LengthDelimited).bytes(message.payloadToSign);
        /* string signature_type = 3; */
        if (message.signatureType !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.signatureType);
        /* ubt.uint256 estimated_fee = 4; */
        if (message.estimatedFee)
            uint256.internalBinaryWrite(message.estimatedFee, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* bytes raw_data = 5; */
        if (message.rawData.length)
            writer.tag(5, WireType.LengthDelimited).bytes(message.rawData);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransactionIntent
 */
export const TransactionIntent = new TransactionIntent$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransactionCombineRequest$Type extends MessageType<TransactionCombineRequest> {
    constructor() {
        super("ubt.services.TransactionCombineRequest", [
            { no: 1, name: "chain_id", kind: "message", T: () => ChainId },
            { no: 2, name: "intent", kind: "message", T: () => TransactionIntent },
            { no: 3, name: "signatures", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<TransactionCombineRequest>): TransactionCombineRequest {
        const message = { signatures: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransactionCombineRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransactionCombineRequest): TransactionCombineRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.ChainId chain_id */ 1:
                    message.chainId = ChainId.internalBinaryRead(reader, reader.uint32(), options, message.chainId);
                    break;
                case /* ubt.services.TransactionIntent intent */ 2:
                    message.intent = TransactionIntent.internalBinaryRead(reader, reader.uint32(), options, message.intent);
                    break;
                case /* repeated bytes signatures */ 3:
                    message.signatures.push(reader.bytes());
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
    internalBinaryWrite(message: TransactionCombineRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.ChainId chain_id = 1; */
        if (message.chainId)
            ChainId.internalBinaryWrite(message.chainId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* ubt.services.TransactionIntent intent = 2; */
        if (message.intent)
            TransactionIntent.internalBinaryWrite(message.intent, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated bytes signatures = 3; */
        for (let i = 0; i < message.signatures.length; i++)
            writer.tag(3, WireType.LengthDelimited).bytes(message.signatures[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransactionCombineRequest
 */
export const TransactionCombineRequest = new TransactionCombineRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransactionSignRequest$Type extends MessageType<TransactionSignRequest> {
    constructor() {
        super("ubt.services.TransactionSignRequest", [
            { no: 1, name: "chain_id", kind: "message", T: () => ChainId },
            { no: 2, name: "intent", kind: "message", T: () => TransactionIntent },
            { no: 3, name: "private_key", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<TransactionSignRequest>): TransactionSignRequest {
        const message = { privateKey: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransactionSignRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransactionSignRequest): TransactionSignRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.ChainId chain_id */ 1:
                    message.chainId = ChainId.internalBinaryRead(reader, reader.uint32(), options, message.chainId);
                    break;
                case /* ubt.services.TransactionIntent intent */ 2:
                    message.intent = TransactionIntent.internalBinaryRead(reader, reader.uint32(), options, message.intent);
                    break;
                case /* bytes private_key */ 3:
                    message.privateKey = reader.bytes();
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
    internalBinaryWrite(message: TransactionSignRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.ChainId chain_id = 1; */
        if (message.chainId)
            ChainId.internalBinaryWrite(message.chainId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* ubt.services.TransactionIntent intent = 2; */
        if (message.intent)
            TransactionIntent.internalBinaryWrite(message.intent, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* bytes private_key = 3; */
        if (message.privateKey.length)
            writer.tag(3, WireType.LengthDelimited).bytes(message.privateKey);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransactionSignRequest
 */
export const TransactionSignRequest = new TransactionSignRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransactionSendRequest$Type extends MessageType<TransactionSendRequest> {
    constructor() {
        super("ubt.services.TransactionSendRequest", [
            { no: 1, name: "chain_id", kind: "message", T: () => ChainId },
            { no: 2, name: "intent", kind: "message", T: () => TransactionIntent },
            { no: 3, name: "signatures", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<TransactionSendRequest>): TransactionSendRequest {
        const message = { signatures: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransactionSendRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransactionSendRequest): TransactionSendRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.ChainId chain_id */ 1:
                    message.chainId = ChainId.internalBinaryRead(reader, reader.uint32(), options, message.chainId);
                    break;
                case /* ubt.services.TransactionIntent intent */ 2:
                    message.intent = TransactionIntent.internalBinaryRead(reader, reader.uint32(), options, message.intent);
                    break;
                case /* repeated bytes signatures */ 3:
                    message.signatures.push(reader.bytes());
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
    internalBinaryWrite(message: TransactionSendRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.ChainId chain_id = 1; */
        if (message.chainId)
            ChainId.internalBinaryWrite(message.chainId, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* ubt.services.TransactionIntent intent = 2; */
        if (message.intent)
            TransactionIntent.internalBinaryWrite(message.intent, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* repeated bytes signatures = 3; */
        for (let i = 0; i < message.signatures.length; i++)
            writer.tag(3, WireType.LengthDelimited).bytes(message.signatures[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransactionSendRequest
 */
export const TransactionSendRequest = new TransactionSendRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class SignedTransaction$Type extends MessageType<SignedTransaction> {
    constructor() {
        super("ubt.services.SignedTransaction", [
            { no: 1, name: "intent", kind: "message", T: () => TransactionIntent },
            { no: 2, name: "signatures", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<SignedTransaction>): SignedTransaction {
        const message = { signatures: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<SignedTransaction>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: SignedTransaction): SignedTransaction {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* ubt.services.TransactionIntent intent */ 1:
                    message.intent = TransactionIntent.internalBinaryRead(reader, reader.uint32(), options, message.intent);
                    break;
                case /* repeated bytes signatures */ 2:
                    message.signatures.push(reader.bytes());
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
    internalBinaryWrite(message: SignedTransaction, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* ubt.services.TransactionIntent intent = 1; */
        if (message.intent)
            TransactionIntent.internalBinaryWrite(message.intent, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* repeated bytes signatures = 2; */
        for (let i = 0; i < message.signatures.length; i++)
            writer.tag(2, WireType.LengthDelimited).bytes(message.signatures[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.SignedTransaction
 */
export const SignedTransaction = new SignedTransaction$Type();
// @generated message type with reflection information, may provide speed optimized methods
class TransactionSendResponse$Type extends MessageType<TransactionSendResponse> {
    constructor() {
        super("ubt.services.TransactionSendResponse", [
            { no: 1, name: "id", kind: "scalar", T: 12 /*ScalarType.BYTES*/ }
        ]);
    }
    create(value?: PartialMessage<TransactionSendResponse>): TransactionSendResponse {
        const message = { id: new Uint8Array(0) };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<TransactionSendResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: TransactionSendResponse): TransactionSendResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes id */ 1:
                    message.id = reader.bytes();
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
    internalBinaryWrite(message: TransactionSendResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bytes id = 1; */
        if (message.id.length)
            writer.tag(1, WireType.LengthDelimited).bytes(message.id);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message ubt.services.TransactionSendResponse
 */
export const TransactionSendResponse = new TransactionSendResponse$Type();
/**
 * @generated ServiceType for protobuf service ubt.services.UbtConstructService
 */
export const UbtConstructService = new ServiceType("ubt.services.UbtConstructService", [
    { name: "createTransfer", options: {}, I: CreateTransferRequest, O: TransactionIntent },
    { name: "combineTransaction", options: {}, I: TransactionCombineRequest, O: SignedTransaction },
    { name: "signTransaction", options: {}, I: TransactionSignRequest, O: SignedTransaction },
    { name: "send", options: {}, I: TransactionSendRequest, O: TransactionSendResponse }
]);