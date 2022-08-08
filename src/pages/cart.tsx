import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { CartComp } from "../components/Cart";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart | MoviBooks</title>
      </Head>

      <Flex w="100%">
        <CartComp />
      </Flex>
    </>
  )
}