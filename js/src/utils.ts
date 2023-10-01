import { uint256 } from "./api/proto/commons";

export namespace uint256utils {
  export function fromNumber(v: number): uint256 {
    const bytes = new Uint8Array(32);
    new DataView(bytes.buffer).setBigUint64(24, BigInt(v), false);
    return { data: bytes };
  }

  export function toNumber(v: uint256): number {
    const bi = toBigInt(v);
    if (bi > Number.MAX_SAFE_INTEGER) {
      throw new Error("Unsafe conversion from uint256 to number");
    }
    return Number(v);
  }

  export function fromBigInt(v: bigint): uint256 {
    return { data: hexutils.toBytes(v.toString(16)) };
  }

  export function toBigInt(v: uint256): bigint {
    return BigInt(hexutils.fromBytes(v.data, true));
  }

  export function fromHexString(hexStr: string): uint256 {
    return {
      data: hexutils.toBytes(hexStr),
    };
  }

  export function toHexString(v: uint256): string {
    return hexutils.fromBytes(v.data);
  }
}

export namespace hexutils {
  export function fromBytes(bytes: Uint8Array, prefix?: boolean): string {
    const r: string[] = [];
    for (let i = 0; i < bytes.length; i++) r.push(bytes[i].toString(16).padStart(2, "0"));
    return (prefix ? "0x" : "") + r.join("");
  }

  export function toBytes(hexStr: string): Uint8Array {
    let bytes = [];
    if (hexStr.startsWith("0x")) hexStr = hexStr.substring(2);
    if (hexStr.length % 2 !== 0) hexStr = "0" + hexStr;
    for (let c = 0; c < hexStr.length; c += 2) bytes.push(parseInt(hexStr.substring(c, c + 2), 16));
    return new Uint8Array(bytes);
  }

  export function toNumber(v: string): number {
    return Number(BigInt(v));
  }

  export function toBigInt(v: string): bigint {
    return BigInt(v);
  }

  export function fromNumber(v: number): string {
    return BigInt(v).toString(16);
  }

  export function fromBigInt(v: bigint): string {
    return v.toString(16);
  }
}

export namespace bytesutils {
  export function fromNumber(v: number): Uint8Array {
    const bytes = new Uint8Array(8);
    new DataView(bytes.buffer).setBigUint64(0, BigInt(v), false);
    return bytes;
  }

  export function concat(v1: Uint8Array, v2: Uint8Array): Uint8Array {
    const r = new Uint8Array(v1.length + v2.length);
    r.set(v1);
    r.set(v2, v1.length);
    return r;
  }
}

export function maybeMap<T,O>(v: T | undefined, func: (v: T) => O): O | undefined {
  if (v !== undefined) return func(v);
}

export class CurrencyId {
  constructor(readonly address: string, readonly tokenId: string) {}
  static fromString(str: string): CurrencyId {
    return new CurrencyId(str.split(":")[0], str.split(":")[1]);
  }

  isNative(): boolean {
    return this.tokenId === "" && this.address === "";
  }

  isErc20Like(): boolean {
    return this.tokenId === "" && this.address !== "";
  }

  isErc1155Like(): boolean {
    return this.tokenId !== "" && this.address !== "";
  }
}
