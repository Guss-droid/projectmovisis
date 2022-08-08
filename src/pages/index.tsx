import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { HomeComp } from "../components/HomeComp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | MoviBooks</title>
      </Head>

      <Flex w="100%">
        <HomeComp />
      </Flex>
    </>
  )
}