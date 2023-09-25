import { NetworkId } from "@ubt/sdk/dist/gen/models";
import { UbtBlockServiceClient } from "@ubt/sdk/dist/gen/services/block.client";
import ec from "elliptic";

export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

export function generatePair(): KeyPair {
  const curve = new ec.ec("secp256k1");
  const key = curve.genKeyPair();
  return {
    privateKey: key.getPrivate("hex"),
    publicKey: key.getPublic("hex"),
  };
}

export async function deriveAddress(
  client: UbtBlockServiceClient,
  networkId: NetworkId,
  publicKey: string
): Promise<string> {
  const res = await client.deriveAccount({ networkId, publicKey });

  return res.response.id;
}
