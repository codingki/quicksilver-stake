export const cosmoshub = {
  rpc: "https://rpc.testcosmos.directory/cosmoshubtestnet",
  rest: "https://rest.testcosmos.directory/cosmoshubtestnet",
  chainId: "theta-testnet-001",
  chainName: "Cosmos Hub Public Testnet",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub",
  },
  currencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: undefined,
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
  },
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  features: ["stargate", "ibc-transfer"],
};

export const quicksilver = {
  rpc: "https://rpc.testcosmos.directory/quicksilvertestnet",
  rest: "https://rest.testcosmos.directory/quicksilvertestnet",
  chainId: "rhye-1",
  chainName: "Quicksilver Testnet",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "quick",
    bech32PrefixAccPub: "quickpub",
    bech32PrefixValAddr: "quickvaloper",
    bech32PrefixValPub: "quickvaloperpub",
    bech32PrefixConsAddr: "quickvalcons",
    bech32PrefixConsPub: "quickvalconspub",
  },
  currencies: [
    {
      coinDenom: "QCK",
      coinMinimalDenom: "uqck",
      coinDecimals: 6,
      coinGeckoId: "quicksilver",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.png",
    },
  ],
  stakeCurrency: {
    coinDenom: "QCK",
    coinMinimalDenom: "uqck",
    coinDecimals: 6,
    coinGeckoId: "quicksilver",
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.png",
  },
  feeCurrencies: [
    {
      coinDenom: "QCK",
      coinMinimalDenom: "uqck",
      coinDecimals: 6,
      coinGeckoId: "quicksilver",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qck.png",
      gasPriceStep: {
        low: 0.0001,
        average: 0.0001,
        high: 0.00025,
      },
    },
  ],
  features: [
    "stargate",
    "no-legacy-stdTx",
    "ibc-transfer",
    "ibc-go",
    "cosmwasm",
    "wasmd_0.24+",
  ],
};
