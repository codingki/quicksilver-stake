export const cosmoshub = {
  rpc: "https://rpc.cosmos.directory/cosmoshub",
  rest: "https://rest.cosmos.directory/cosmoshub",
  chainId: "cosmoshub-4",
  chainName: "Cosmos Hub",
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
      coinGeckoId: "cosmos",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "ATOM",
    coinMinimalDenom: "uatom",
    coinDecimals: 6,
    coinGeckoId: "cosmos",
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
  },
  feeCurrencies: [
    {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinGeckoId: "cosmos",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  features: ["stargate", "ibc-transfer"],
};

export const quicksilver = {
  rpc: "https://rpc.cosmos.directory/quicksilver",
  rest: "https://rest.cosmos.directory/quicksilver",
  chainId: "quicksilver-2",
  chainName: "Quicksilver",
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
    {
      coinDenom: "qSTARS",
      coinMinimalDenom: "uqstars",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qstars.svg",
    },
    {
      coinDenom: "qATOM",
      coinMinimalDenom: "uqatom",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qatom.svg",
    },
    {
      coinDenom: "qREGEN",
      coinMinimalDenom: "uqregen",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qregen.svg",
    },
    {
      coinDenom: "qOSMO",
      coinMinimalDenom: "uqosmo",
      coinDecimals: 6,
      coinGeckoId: undefined,
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/quicksilver/images/qosmo.svg",
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

export const osmosis = {
  rpc: "https://rpc.cosmos.directory/osmosis",
  rest: "https://rest.cosmos.directory/osmosis",
  chainId: "osmosis-1",
  chainName: "Osmosis",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "osmo",
    bech32PrefixAccPub: "osmopub",
    bech32PrefixValAddr: "osmovaloper",
    bech32PrefixValPub: "osmovaloperpub",
    bech32PrefixConsAddr: "osmovalcons",
    bech32PrefixConsPub: "osmovalconspub",
  },
  currencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "OSMO",
    coinMinimalDenom: "uosmo",
    coinDecimals: 6,
    coinGeckoId: "osmosis",
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
  },
  feeCurrencies: [
    {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
      gasPriceStep: {
        low: 0.0025,
        average: 0.025,
        high: 0.04,
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

export const stargaze = {
  rpc: "https://rpc.cosmos.directory/stargaze",
  rest: "https://rest.cosmos.directory/stargaze",
  chainId: "stargaze-1",
  chainName: "Stargaze",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "stars",
    bech32PrefixAccPub: "starspub",
    bech32PrefixValAddr: "starsvaloper",
    bech32PrefixValPub: "starsvaloperpub",
    bech32PrefixConsAddr: "starsvalcons",
    bech32PrefixConsPub: "starsvalconspub",
  },
  currencies: [
    {
      coinDenom: "STARS",
      coinMinimalDenom: "ustars",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "STARS",
    coinMinimalDenom: "ustars",
    coinDecimals: 6,
    coinGeckoId: "stargaze",
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.svg",
  },
  feeCurrencies: [
    {
      coinDenom: "STARS",
      coinMinimalDenom: "ustars",
      coinDecimals: 6,
      coinGeckoId: "stargaze",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.svg",
      gasPriceStep: {
        low: 1,
        average: 1.1,
        high: 1.2,
      },
    },
  ],
  features: ["stargate", "ibc-transfer"],
};

export const regen = {
  rpc: "https://rpc.cosmos.directory/regen",
  rest: "https://rest.cosmos.directory/regen",
  chainId: "regen-1",
  chainName: "Regen",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "regen",
    bech32PrefixAccPub: "regenpub",
    bech32PrefixValAddr: "regenvaloper",
    bech32PrefixValPub: "regenvaloperpub",
    bech32PrefixConsAddr: "regenvalcons",
    bech32PrefixConsPub: "regenvalconspub",
  },
  currencies: [
    {
      coinDenom: "REGEN",
      coinMinimalDenom: "uregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.svg",
    },
  ],
  stakeCurrency: {
    coinDenom: "REGEN",
    coinMinimalDenom: "uregen",
    coinDecimals: 6,
    coinGeckoId: "regen",
    coinImageUrl:
      "https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.svg",
  },
  feeCurrencies: [
    {
      coinDenom: "REGEN",
      coinMinimalDenom: "uregen",
      coinDecimals: 6,
      coinGeckoId: "regen",
      coinImageUrl:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.svg",
      gasPriceStep: {
        low: 0.015,
        average: 0.025,
        high: 0.04,
      },
    },
  ],
  features: ["stargate", "no-legacy-stdTx", "ibc-transfer", "ibc-go"],
};
