![CI](https://github.com/ubtr/ubt-go/actions/workflows/ci.yml/badge.svg)

# Unified blockchain transfers API

*Currently experimental and not stable*

Attempt to provide unified API to cryptocurrencies from e-commerce and wallet perspective.

Key aspects:
* Native blockchain currencies and tokens unified and can be used without symbol table
* Currency transfers unified for native and other different tokens.
* Block and transaction view unified across blockchains
* Optional client-side private keys and signing process
* Stateless core services which can be implemented without indexing for any blockchain
* Optional services like balance lookups which may need indexing and storage
* Performant GRPC based protocol intended for internal or public internet usage

See protobuf definitions in 'proto' dir for grpc services and models

Inspired by [Rosetta API](https://www.rosetta-api.org/)


## Core
Core functionality is what should be implemented by any blockchain to be compatible with this API otherwise it doesn't make sense.
* Block parsing and converting to universal structures.
* Constructing and broadcasting 'transfer' transactions
* Address generation

## Core model

### Chain ID
```
(chain-type)[:chain-network]
```
 * **chain-type** - general approach is to get symbol from (https://github.com/satoshilabs/slips/blob/master/slip-0044.md)[SLIP-0044] filtering out non-native or cross-chain coins
 * **chain-network** - instance of the network like mainnet, testnet, regtest, etc. **mainnet** is default and can be omitted

### Unified Currency ID
**Normalized form:**
```
F:(ISO4217-3-symbol-currency-code) | C:chain-id[:address[:token-id]]
```
 * All parts except <i>address</i> and <i>token-id</i> are uppercase. Empty trailing parts are eliminated.
 * **F** or **C** - currency type. F - fiat, C - crypto
 * **chain-id** - blockchain identifier
 * **address** - contract address of the token
 * **token-id** - token identifier within the token contract or id if blockchain supports custom tokens without contract

Parsing is bit more lenient:
* All parts except address and token-id are case-insensitive
* Empty parts can be included

**Examples:**
* `F:USD` - fiat currency
* `C:ETH` - native currency of ethereum blockchain (ETH itself)
* `C:ETH::0x6b175474e89094c44da98b954eedeac495271d0f` - DAI token on Ethereum blockchain
* `C:ETH:MAINNET:0x6b175474e89094c44da98b954eedeac495271d0f:` - same as above
* `c:Eth:mainnet:0x6b175474e89094c44da98b954eedeac495271d0f:` - same as above

# Services
* Balances - indexed access to balances of any address in any currency
* Account Manager - delegate account/private keys management to external service

# Build
Uses **[Earthly](https://earthly.dev/ )** as build system.

Generate from protobufs:
```
earthly +generate
```

Build:
```
earthly +build
```

Build and push packages:
```
earthly +publish
```

# Credits
* [Rosetta API](https://www.rosetta-api.org/) - inspiration and some ideas