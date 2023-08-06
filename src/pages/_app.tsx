import type { AppProps } from "next/app";
import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { GrazProvider, WalletType } from "graz";
import { chains } from "@/constants/graz";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GrazProvider
        grazConfig={{
          chains: chains,
          defaultWallet: WalletType.KEPLR,
        }}
      >
        <ChakraProvider theme={theme}>
          <DarkMode>
            <Component {...pageProps} />
          </DarkMode>
        </ChakraProvider>
      </GrazProvider>
    </QueryClientProvider>
  );
}
