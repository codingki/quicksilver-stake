import { WalletType } from "graz";
import { cosmoshub, osmosis, quicksilver, regen, stargaze } from "./chains";

export const chains = [quicksilver, cosmoshub, osmosis, stargaze, regen];

export const listedWallets = {
  [WalletType.KEPLR]: {
    name: "Keplr",
    imgSrc: "/assets/wallet-icon-keplr.png",
  },
  [WalletType.LEAP]: {
    name: "Leap",
    imgSrc: "/assets/wallet-icon-leap.png",
  },
  [WalletType.COSMOSTATION]: {
    name: "Cosmostation",
    imgSrc: "/assets/wallet-icon-cosmostation.png",
  },
};

export const listedChains = [
  {
    name: "Cosmos Hub",
    chainId: cosmoshub.chainId,
    imgSrc: "/assets/chains/cosmoshub.png",
    stakeDenom: "uqatom",
  },
  {
    name: "Osmosis",
    chainId: osmosis.chainId,
    imgSrc: "/assets/chains/osmosis.png",
    stakeDenom: "uqosmo",
  },
  {
    name: "Stargaze",
    chainId: stargaze.chainId,
    imgSrc: "/assets/chains/stargaze.png",
    stakeDenom: "uqstars",
  },
  {
    name: "Regen",
    chainId: regen.chainId,
    imgSrc: "/assets/chains/regen.png",
    stakeDenom: "uqregen",
  },
];
