"use strict";

declare module "tronweb" {
  import { BigNumber } from "bignumber.js";
  import {
    Account,
    AccountMnemonic,
    AssetTRC10,
    AssetUpdate,
    BlockInfo,
    BlockInput,
    BlockTransaction,
    BytesLike,
    ChainParameter,
    ContractExecutionParams,
    CreateRandomOptions,
    DelegatedResourceAccount,
    DelegatedResourceList,
    EnergyEstimate,
    EventResult,
    Exchange,
    Header,
    HexString,
    JsonFragment,
    KeyValue,
    Miner,
    NodeInfo,
    Proposal,
    Resource,
    SideOptions,
    TokenInfo,
    Transaction,
    TransactionResult,
    TriggerConstantContractResult,
    TronAccountResource,
    TronContract,
    TronContractResult,
    TronWebConstructor,
    TrxAccount,
  } from "tronweb/interfaces";
  export * from "tronweb/interfaces";

  export class TronWeb {
    address: Address;
    transactionBuilder: TransactionBuilder;
    trx: Trx;
    utils: Utils;
    constructor(fullNode: string, solidityNode: string, eventServer: string | boolean, privateKey?: string | boolean);
    constructor(
      fullNode: string,
      solidityNode: string,
      eventServer: string | boolean,
      sideOptions: SideOptions,
      privateKey?: string | boolean
    );
    constructor(obj: TronWebConstructor);
    contract(data: JsonFragment[] = [], address: string = false): TronContract;
    setHeader(header: Header): void | Error;
    currentProvider(): any;
    currentProviders(): any;
    getEventByTransactionID(transactionID: string): Promise<Transaction | any>;
    getEventResult(contractAddress: string, options?: Object): Promise<EventResult[] | any>; // check this return
    isConnected(): Object;
    isValidProvider(provider: any): any;
    setAddress(address: string): void | Error;
    setDefaultBlock(blockID?: BlockInput): void | string | boolean;
    setEventServer(eventServer: any): void | Error;
    setFullNode(fullNode: any): void | Error;
    setPrivateKey(privateKey: string): void | Error;
    setSolidityNode(solidityNode: any): void | Error;
    createAccount(): Promise<Account | any>;
    createRandom(options?: CreateRandomOptions): Promise<AccountMnemonic | any>;
    fromAscii(string: any, padding: any): any;
    fromDecimal(value: number | string): string;
    fromSun(sun: string | number): string;
    fromUtf8(string: string): string;
    fromMnemonic(mnemonic: string, path?: string, wordlist?: string): AccountMnemonic | Error;
    isAddress(address: string): boolean;
    sha3(string: string, prefix?: boolean): HexString;
    toAscii(hex: HexString): string;
    toBigNumber(amount: number | string | HexString): BigNumber | Object;
    toDecimal(value: string | HexString): number | string;
    toHex(val: string | number | object | [] | BigNumber): HexString;
    toSun(trx: number): string;
    toUtf8(hex: string): string;
    BigNumber(val: number | string | HexString): BigNumber;
  }

  export interface TransactionBuilder {
    addUpdateData(unsignedTransaction: JSON | Object, memo: string): Promise<Transaction | Object>;
    applyForSR(address: string, url: string, options?: number): Promise<Transaction | Object>;
    createAccount(address: string, options?: JSON | Object): Promise<Transaction | Object>;
    createAsset(options: AssetTRC10, issuerAddress: string): Promise<Transaction | Object>;
    createProposal(parameters: KeyValue[], issuerAddress: string, options?: number): Promise<Transaction | Object>;
    createSmartContract(options: ContractExecutionParams, issuerAddress: string): Promise<Transaction | Object>;
    createToken(options: AssetTRC10, issuerAddress: string): Promise<Transaction | Object>;
    delegateResource(
      amount: number,
      receiverAddress: string,
      resource: string,
      address: string,
      lock: boolean,
      options?: Object
    ): Promise<Object>;
    deleteProposal(proposalID: number, issuerAddress: string, options?: number): Promise<Transaction | Object>;
    estimateEnergy(
      contractAddress: string | HexString,
      functionSelector: string,
      options: Object,
      parameter: any[],
      issuerAddress: string | HexString
    ): Promise<EnergyEstimate>;
    extendExpiration(transaction: Transaction | JSON | Object, extension: number): Promise<Transaction>;
    freezeBalance(
      amount: number,
      duration: number,
      resource: Resource,
      ownerAddress: string,
      receiverAddress: string,
      options?: number
    ): Promise<Transaction>;
    freezeBalanceV2(
      amount: number,
      resource: Resource,
      ownerAddress: string,
      options?: Object
    ): Promise<Transaction | Object>;
    injectExchangeTokens(
      exchangeID: number,
      tokenID: string,
      tokenAmount: number,
      ownerAddress: string,
      options?: number
    ): Promise<Transaction>;
    purchaseAsset(
      issuerAddress: string,
      tokenID: string,
      amount: number,
      buyer?: string,
      options?: number
    ): Promise<Transaction | Object>;
    purchaseToken(
      issuerAddress: string,
      tokenID: string,
      amount: number,
      buyer?: string,
      options?: number
    ): Promise<Transaction | Object>;
    sendAsset(
      to: string,
      amount: number,
      tokenID: string,
      from: string,
      options: number
    ): Promise<Transaction | Object>;
    sendToken(to: string, amount: number | string, tokenID: string, pk?: string): Promise<Transaction | Object>;
    sendTrx(to: string, amount: number, from: string, options?: number): Promise<Transaction | Object>;
    tradeExchangeTokens(
      exchangeID: number,
      tokenID: string,
      tokenAmountSold: number,
      tokenAmountExpected: number,
      ownerAddress: string,
      options: number
    ): Promise<Transaction | Object>;
    triggerConfirmedConstantContract(
      contractAddress: string,
      functions: string,
      options: Object,
      parameter: any[],
      issuerAddress: string
    ): Promise<TransactionResult | Object>;
    triggerConstantContract(
      contractAddress: string,
      functions: string,
      options: Object,
      parameter: any[],
      issuerAddress: string
    ): Promise<TriggerConstantContractResult | Object>;
    triggerSmartContract(
      contractAddress: string,
      functions: string,
      options: Object,
      parameter: any[],
      issuerAddress: string
    ): Promise<TriggerConstantContractResult | Object>;
    undelegateResource(
      amount: number,
      receiverAddress: string,
      resource: string,
      address: string,
      options?: Object
    ): Promise<Object>;
    unfreezeBalance(
      resource: Resource,
      address: string,
      receiver: string,
      options: number
    ): Promise<Transaction | Object>;
    unfreezeBalanceV2(amount: number, resource: Resource, address: string, options: Object): Promise<Object>;
    updateSetting(
      contract_address: string,
      consume_user_resource_percent: number,
      owner_address: string,
      options: number
    ): Promise<Transaction | Object>;
    updateAccountPermissions(
      owner_address: string,
      ownerPermissions: Object,
      witnessPermissions: Object | null,
      activesPermissions: Object[]
    ): Promise<Transaction | Object>;
    updateAsset(options: AssetUpdate, issuerAddress: string): Promise<Transaction | Object>;
    updateBrokerage(brokerage: number, ownerAddress: string): Promise<Transaction | Object>;
    updateEnergyLimit(
      contract_address: string,
      origin_energy_limit: number,
      owner_address: string,
      options: number
    ): Promise<Transaction | Object>;
    updateToken(options: AssetUpdate, issuerAddress: string): Promise<Transaction | Object>;
    vote(votes: Object, voterAddress: string, option: number): Promise<Transaction | Object>;
    voteProposal(
      proposalID: number,
      hasApproval: string,
      voterAddress: string,
      options: number
    ): Promise<Transaction | Object>;
    withdrawBlockRewards(address: string, options: number): Promise<Transaction | Object>;
    withdrawExchangeTokens(
      exchangeID: number,
      tokenID: string,
      tokenAmount: number,
      ownerAddress: string,
      options: number
    ): Promise<Transaction | Object>;
    withdrawExpireUnfreeze(address: string): Promise<Object>;
  }
  export interface Trx {
    getAccount(address: HexString | string): Promise<TrxAccount>;
    getAccountResources(address: HexString | string): Promise<TronAccountResource>;
    getApprovedList(r: Transaction): Promise<TransactionResult>;
    getAvailableUnfreezeCount(address: string | HexString, options?: Object): Promise<Object>;
    getBalance(address: string | HexString): Promise<number>;
    getBandwidth(address: string | HexString): Promise<Object>;
    getBlock(block?: number | string): Promise<BlockInfo>;
    getBlockByHash(blockHash: string): Promise<BlockInfo>;
    getBlockByNumber(blockID: number): Promise<BlockInfo>;
    getBlockRange(start: number, end: number): Promise<BlockInfo[]>;
    getBlockTransactionCount(block: number | string): Promise<Object | number>;
    getBrokerage(address: string | HexString): Promise<number | any>;
    getCanDelegatedMaxSize(address: string | HexString, resource?: Resource, options?: Object): Promise<Object>;
    getCanWithdrawUnfreezeAmount(address: string | HexString, timestamp?: number, options?: Object): Promise<Object>;
    getChainParameters(): Promise<ChainParameter[] | any>;
    getConfirmedTransaction(transactionID: string): Promise<Object>;
    getContract(contractAddress: string | HexString): Promise<TronContractResult | TronContract | Object>;
    getCurrentBlock(): Promise<BlockInfo>;
    getDelegatedResourceV2(
      fromAddress: string | HexString,
      toAddress: string | HexString,
      options?: Object
    ): Promise<DelegatedResourceList | Object>;
    getDelegatedResourceAccountIndexV2(
      address: string | HexString,
      options?: Object
    ): Promise<DelegatedResourceAccount | Object>;
    getExchangeByID(exchangeID: number): Promise<Exchange | Object>;
    getNodeInfo(): Promise<NodeInfo | Object>;
    getReward(address: string | HexString): Promise<number>;
    getSignWeight(tx: Transaction): Promise<TransactionResult | Object>;
    getTokenByID(tknID: string | number): Promise<TokenInfo | Object>;
    getTokenFromID(tokenID: string | number): Promise<TokenInfo>;
    getTokenListByName(name: string): Promise<TokenInfo[] | Object[]>;
    getTokensIssuedByAddress(address: string | HexString): Promise<Object>;
    getTransaction(transactionID: string): Promise<BlockTransaction | Object>;
    getTransactionFromBlock(
      block: number | string,
      index: number
    ): Promise<BlockTransaction[] | Object[] | BlockTransaction | Object>;
    getTransactionInfo(transactionID: string): Promise<TransactionInfo | Object>;
    getUnconfirmedBalance(address: string): Promise<number>;
    getUnconfirmedBrokerage(address: string): Promise<number>;
    getUnconfirmedReward(address: string): Promise<number>;
    getUnconfirmedTransactionInfo(txid: string): Promise<Transaction | Object>;
    listExchanges(): Promise<Exchange[] | Object[]>;
    listExchangesPaginated(limit: number, offset: number): Promise<Exchange[] | Object[]>;
    listNodes(): Promise<string[] | Object>;
    listProposals(): Promise<Proposal[] | Object[] | Object>;
    listSuperRepresentatives(): Promise<Miner[] | Object[]>;
    listTokens(limit?: number, offset?: number): Promise<TokenInfo[] | Object[]>;
    sendRawTransaction(signedTransaction: JSON | Object, options?: any): Promise<TransactionResult | Object>;
    sendHexTransaction(signedHexTransaction: string | HexString): Promise<Transaction | Object>;
    sendToken(
      to: string,
      amount: number,
      tokenID: string,
      from: string,
      options: number
    ): Promise<TransactionResult | Object>;
    sendTransaction(to: string, amount: number, pk?: string): Promise<TransactionResult | Object>;
    sign(transaction: Object, privateKey: string): Promise<Transaction | Object>;
    sign(str: string, privateKey: string): Promise<string>;
    signMessageV2(msg: string | BytesLike, privateKey: string): Promise<string>;
    timeUntilNextVoteCycle(): Promise<number>;
    multiSign(tx: JSON | Object, pk: string, permissionId: number): Promise<Transaction | Object>;
    verifyMessage(message: string | HexString, signature: string, address: string): Promise<boolean>;
    verifyMessageV2(message: string | HexString, signature: string): Promise<string>;
    _signTypedData(
      domain: JSON | Object,
      types: JSON | Object,
      value: JSON | Object,
      privateKey: string
    ): Promise<string>;
    verifyTypedData(
      domain: JSON | Object,
      types: JSON | Object,
      value: JSON | Object,
      signature: string,
      address: string
    ): Promise<boolean | Error>;
  }
  export interface Address {
    fromHex(hex: string): string;
    fromPrivateKey(pk: string): string;
    toHex(base58: string): string;
  }
  export interface UtilsTransaction {
    txJsonToPb(tx: JSON | Object): Object;
    txPbToTxID(tx: JSON | Object): string;
  }
  
  export interface Utils {
    transaction: UtilsTransaction;
  }

  export namespace TronWeb {
    export namespace address {
      function fromHex(hex: string): string;
      function fromPrivateKey(pk: string): string;
      function toHex(base58: string): string;
    }
    export namespace utils {
      export namespace crypto {
        function computeAddress(pubKey: Uint8Array): Uint8Array;
      }
    }
  }

  export default TronWeb;
}
