import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { Box, Flex, IconButton, Text, useColorMode } from "@chakra-ui/react";

import { BsMoon, BsSun } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";

export function Header() {

  const router = useRouter()
  const { cart } = useCart()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex w="95%" m={8} justify="space-between" align="center">
      <Flex
        fontSize={22}
        fontWeight={600}
        onClick={() => router.push("/")}
        cursor="pointer"
      >
        <Text>Movi</Text>

        <Text color="blue.200">
          Books.
        </Text>
      </Flex>

      <Flex gap={[3, 6]}>
        <IconButton
          aria-label="toggle theme"
          icon={colorMode !== "light" ? <BsSun /> : <BsMoon />}
          fontSize={[24, 22, 22]}
          variant="ghost"
          onClick={() => toggleColorMode()}
          transition="0.8s"
          _hover={{
            opacity: 0.7,
            transition: "0.5s",
            transform: "scale(1.2)",
          }}
        />

        <Link href="/cart" passHref>
          <a>
            <Flex mr={4}>
              <IconButton
                aria-label="go to shop page"
                icon={<RiShoppingCartLine />}
                fontSize={[24, 22, 22]}
                variant="ghost"
                ml={-2}
                _hover={{
                  opacity: 0.7,
                  transition: "0.5s",
                  transform: "scale(1.2)",
                }}
              />

              <Box ml={-1} color="blue.500" fontSize={18} fontWeight={600}>
                {cart.length}
              </Box>
            </Flex>
          </a>
        </Link>
      </Flex>
    </Flex>
  )
}