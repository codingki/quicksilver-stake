import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bgColor: "#1A1A1A",
      },
    },
  },
  colors: {
    brand: "#D35100",
    baseBg: "#1A1A1A",
  },
});
