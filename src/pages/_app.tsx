import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/global.css";
import { theme } from "../styles/theme";
import { Header } from "../components/Header";
import { CartProvider } from "../context/CartContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}