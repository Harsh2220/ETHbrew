import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { polygon, polygonMumbai } from "wagmi/chains";
import { wagmiClient } from "../utils/wagmi";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  // const { chains, provider } = configureChains(
  //   [polygonMumbai],
  //   [publicProvider()]
  // );

  // const { connectors } = getDefaultWallets({
  //   appName: "My RainbowKit App",
  //   chains,
  // });

  // const wagmiClient = createClient({
  //   autoConnect: true,
  //   connectors,
  //   provider,
  // });

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
      
          <Component {...pageProps} />
       
      </WagmiConfig>
    </ChakraProvider>
  );
}
