import config from "config";

export interface NetworkAlias {
  type: string;
  network: string;
}

export interface AccountConfigObj {
  address: string;
  pk?: string;
}

export interface CurrencyAlias {
  id: string;
  decimals: number;
}

export interface Config {
  host: string;
  amHost: string;
  networks: { [key: string]: NetworkAlias };
  accounts: { [key: string]: AccountConfigObj };
  currencies: { [key: string]: CurrencyAlias };
}

export default config.util.toObject() as Config;
