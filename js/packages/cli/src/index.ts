import { ChannelCredentials } from "@grpc/grpc-js";
import { program } from "commander";
import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import { UbtNetworkServiceClient } from "@ubt/sdk/dist/gen/services/network.client";
import { UbtBlockServiceClient } from "@ubt/sdk/dist/gen/services/block.client";
import { UbtConstructServiceClient } from "@ubt/sdk/dist/gen/services/construct.client";
import { UbtCurrencyServiceClient } from "@ubt/sdk/dist/gen/services/currencies.client";
import log from "./log";
import conf, { AccountConfigObj } from "./config";
import { listBlocksFrom } from "./cmds/block";
import { deriveAddress, generatePair } from "./cmds/account";
import { bytesutils, hexutils, uint256utils } from "@ubt/sdk";
import { NetworkId } from "@ubt/sdk/dist/gen/models";
import { RpcError } from "@protobuf-ts/runtime-rpc";
import { createAccount, listAccounts } from "./cmds/am";
import { UbtAccountManagerClient } from "@ubt/sdk/dist/gen/services/am/accountmanager.client";
import { resolveAccount } from "./accounts";

let host = conf.host || "localhost:50051";
let net = "@default";

function requireOption(options: any, option: string): string {
  const o = options?.option;
  if (!o) {
    throw new Error(`Option ${option} is required`);
  }
  return o;
}

function makeNet(netIdStr: string): NetworkId {
  return { type: netIdStr.split(":")[0], network: netIdStr.split(":")[1] };
}

function getNet(): NetworkId {
  if (!net) {
    throw new Error("Network is not set");
  }
  let actualNet: NetworkId;
  if (net.startsWith("@")) {
    actualNet = conf.networks[net.substring(1)];
  } else {
    actualNet = makeNet(net);
  }
  return actualNet;
}

function resolveCurrency(currencyId: string): string {
  if (currencyId.startsWith("@")) {
    return conf.currencies[currencyId.substring(1)].id;
  } else {
    return currencyId;
  }
}
function resolveAccountOld(accountId: string): AccountConfigObj {
  if (accountId.startsWith("@")) {
    return conf.accounts[accountId.substring(1)];
  } else {
    return { address: accountId };
  }
}

let transport: GrpcTransport;
function createTransport(hostArg?: string) {
  if (transport) return transport;

  if (!hostArg) {
    hostArg = host;
  }
  transport = new GrpcTransport({
    host: hostArg,
    channelCredentials: ChannelCredentials.createInsecure(),
  });
  return transport;
}

function makeNetworkClient() {
  return new UbtNetworkServiceClient(createTransport());
}

function makeBlockClient() {
  return new UbtBlockServiceClient(createTransport());
}

function makeConstructClient() {
  return new UbtConstructServiceClient(createTransport());
}

function makeCurrencyClient() {
  return new UbtCurrencyServiceClient(createTransport());
}

function makeAMClient() {
  return new UbtAccountManagerClient(createTransport(conf.amHost));
}

program
  .name("cli")
  .description("UBT cli")
  .version("0.1.0")
  .option("-H, --host <host>", "Host to connect to", host)
  .option("-n, --net <net>", "Network ID in format network:instance. Suuport aliases")
  .action((options) => {
    log("Global opts: $o", options)
    host = options.host;
    net = options.net;
  });

program
  .command("config")
  .description("Show effective config")
  .action(() => {
    console.log(conf);
  });

program
  .command("net")
  .description("List available networks")
  .argument("<type>", "Network type")
  .action(async (type?: string) => {
    const res = makeNetworkClient().listNetworks({ type: type });
    for await (let response of res.responses) {
      console.log(`net: ${response.id?.type}:${response.id?.network}`);
    }
  });

const blockCmd = program.command("block").description("Blocks commands");

blockCmd
  .command("list")
  .description("List blocks")
  .argument("<start>", "Start block number")
  .argument("[count]", "Number of blocks to list", "10")
  .action(async (start: number, count: number, options) => {
    log("opts: $o", options)
    await listBlocksFrom(makeBlockClient(), getNet(), BigInt(start), count);
  });

const accountCmd = program.command("account").description("Account commands");
accountCmd
  .command("random")
  .description("Generate random account/address")
  .action(async () => {
    const keyPair = generatePair();
    const address = await deriveAddress(makeBlockClient(), getNet(), keyPair.publicKey);
    console.log(`Address: ${address}`);
    console.log(`Public key: ${keyPair.publicKey}`);
    console.log(`Private key: ${keyPair.privateKey}`);
  });

const txCmd = program.command("tx").description("Transaction construction");

txCmd
  .command("transfer")
  .description("Create and send transfer transaction")
  .option("-p, --pk <pk>", "Private key in HEX")
  .option("-s, --simulate", "Simulate transaction")
  .argument("<from>", "Sender address")
  .argument("<to>", "Receiver address")
  .argument("<amount>", "Amount to transfer in minimal units")
  .argument("<currency>", "Currency to transfer")
  .action(async (from: string, to: string, amount: bigint, currency: string, options) => {
    const fromAddr = await resolveAccount(getNet().type, makeAMClient(), from);

    //const pk = options.pk;
    //if (!pk) {
    //  console.error("Private key for 'from' account is required");
    //  return;
    //}
    const constructClient = makeConstructClient();
    const transferRequest = {
      networkId: getNet(),
      from: fromAddr?.address,
      to: (await resolveAccount(getNet().type, makeAMClient(), to))?.address,
      amount: {
        value: uint256utils.fromBigInt(amount),
        currencyId: resolveCurrency(currency),
      },
    };
    const transferRes = await constructClient.createTransfer(transferRequest);

    console.log(`Transfering ${amount} (${transferRequest.amount.currencyId}) from ${transferRequest.from} to ${transferRequest.to}. Estimated fee: ${uint256utils.toBigInt(transferRes.response.estimatedFee!)}`);
    
    log("transfer: %o", transferRes.response);
    const signRes = await constructClient.signTransaction({
      networkId: getNet(),
      intent: transferRes.response,
      privateKey: hexutils.toBytes(pk),
    });
    log("signRes: $o", signRes.response);

    if (!options.simulate) {
      const sendRes = await constructClient.send({ ...signRes.response, networkId: getNet() });
      log("sendRes: %o", sendRes.response);
      console.log(`Transaction sent: ${sendRes.response.id}`);
    } else {
      console.log(`Simulated transaction: ${transferRes.response.id}`);
    }
  });

program
.command("currency")
.description("Currency commands")
.arguments("<id>")
 .action(async (id: string) => {
  const client = makeCurrencyClient();
  const res = await client.getCurrency({ networkId: getNet(), id: id });
  console.log(res.response);
 });

const amCmd = program.command("am").description("Account manager");
amCmd
  .command("random")
  .description("Generate random account/address")
  .option("-n, --name", "Optional name for an account/address")
  .action(async () => {
    await createAccount(makeAMClient())
  });

amCmd
  .command("list")
  .description("List accounts")
  .action(async () => {
    await listAccounts(makeAMClient())
  });

try {
  await program.parseAsync();
} catch (e: any) {
  if (e instanceof RpcError) {
    program.error(`error: code=${e.code} ${e.message}`);
  } else {
    program.error(`error: ${JSON.stringify(e)}`);
  }
  
}




