import { UbtAccountManagerClient } from "@ubt/sdk/dist/gen/services/am/accountmanager.client";

export async function listAccounts(c: UbtAccountManagerClient) {
  const res = await c.listAccounts({})
  for(let a of res.response.accounts) {
   console.log(`- ${a.name}:${a.address}`)
  }
}

export async function createAccount(c: UbtAccountManagerClient) {
  const res = await c.createAccount({networkType: "TRX", name: "Test", privateKey: Uint8Array.of([] as any)})
  console.log(res.response.address)
}