import { WalletType } from "graz";
import { cosmoshub, quicksilver } from "./testnet";

export const chains = [quicksilver, cosmoshub];

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
    name: "Quicksilver Testnet",
    chainId: quicksilver.chainId,
    imgSrc: "/assets/chains/quicksilver.png",
    stakeDenom: "uqatom",
  },
  {
    name: "Cosmos Hub Testnet",
    chainId: cosmoshub.chainId,
    imgSrc: "/assets/chains/cosmoshub.png",
    stakeDenom: "uqatom",
  },
];
