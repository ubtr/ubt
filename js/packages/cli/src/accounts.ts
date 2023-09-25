import { UbtConstructServiceClient } from "@ubt/sdk/dist/gen/services/construct.client";
import conf, { AccountConfigObj } from "./config";
import { UbtAccountManagerClient } from "@ubt/sdk/dist/gen/services/am/accountmanager.client";

type Signer = (dataToSign: Uint8Array) => Promise<Uint8Array>

interface Account {
  address: string
  sign: Signer
}

function resolveAccountFromConf(accountId: string): AccountConfigObj | undefined {
  if (accountId.startsWith("@")) {
    return conf.accounts[accountId.substring(1)];
  }
}

/**
 * Return account abstraction
 * @param client 
 * @param nameOrAddress 
 * @returns 
 */
export async function resolveAccount(networkType: string, client: UbtAccountManagerClient, nameOrAddress: string): Promise<Account | undefined> {
  const fromConf = resolveAccountFromConf(nameOrAddress)
  if (fromConf) {
    return {
      address: nameOrAddress,
      sign: async (dataToSign: Uint8Array) => {throw new Error("Not implemented")}
    };
  } else {
    const name = nameOrAddress.startsWith("@") ? nameOrAddress.substring(1) : "";
    const res = await client.hasAccount({address: nameOrAddress, name: name})
    if (res.response.exists) {
      return {
        address: nameOrAddress,
        sign: async (dataToSign: Uint8Array) => {
          const res = await client.signPayload({name: name, address: nameOrAddress, networkType: networkType, data: dataToSign})
          return res.response.signature
        }
      }
    }
  }
}