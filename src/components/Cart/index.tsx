import { Button, Divider, Flex, Text, useToast } from "@chakra-ui/react";

import { CardFinishBuy } from "./CardFinishBuy";
import { formatPrice } from "../../utils/formats";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/router";

export interface IBook {
  id: number;
  name?: string;
  price: number;
  image?: string;
  amount: number;
}

export function CartComp() {

  const toast = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { cart, updateProductAmount, removeProduct, clearCart } = useCart()

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))

  const total = formatPrice(cart.reduce((sum, product) => {
    return sum + product.price * product.amount
  }, 0))

  function incrementBook(book: IBook) {
    updateProductAmount({
      idBook: book.id,
      amount: book.amount + 1
    })
  }

  function decrementBook(book: IBook) {
    updateProductAmount({
      idBook: book.id,
      amount: book.amount - 1
    })
  }

  function handleRemoveProduct(bookId: number) {
    removeProduct(bookId)
  }

  async function handleFinishBuy() {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast({
      title: "Compra finalizada com sucesso.",
      status: "success",
      duration: 4000,
      position: "top-right",
      isClosable: true
    })

    clearCart()

    setLoading(false)
    router.push("/")
  }

  return (
    <Flex align="center" justify="center" w="100%" flexDir="column">
      <Text fontSize={22} fontWeight={600}>
        Livros selecionados
      </Text>

      <Flex
        bg="gray.50"
        borderRadius="8px 32px"
        flexDir="column"
        color="gray.1000"
        w={["70%", "50%", "40%", "25%"]}
        align="center"
        mt={4}
      >
        {cart.length <= 0 ?
          <Flex align="center" justify="center" h={20}>
            <Text fontWeight={600}>Nenhum livro no carrinho</Text>
          </Flex>
          :
          <>
            {cartFormatted.map(item => (
              <>
                <CardFinishBuy
                  id={item?.id}
                  image={item?.image}
                  name={item?.name}
                  price={item.subTotal}
                  key={item.id}
                  cart={item}
                  amount={item?.amount}
                  incrementBook={incrementBook}
                  decrementBook={decrementBook}
                  removeProduct={handleRemoveProduct}
                />

                <Divider my={2} bg="gray.150" w="90%" mx={6} />
              </>
            ))}

            <Flex
              align="center"
              justify="space-between"
              w="90%"
              fontWeight={600}
              fontSize={22}
            >
              <Text my={4}>
                Total:
              </Text>
              {total}
            </Flex>

            <Button
              h={12}
              bg="blue.700"
              color="gray.0"
              w="80%"
              mb={8}
              my={6}
              isLoading={loading}
              onClick={() => handleFinishBuy()}
              _hover={{ opacity: 0.7 }}
            >
              Finalizar compra
            </Button>
          </>
        }
      </Flex>
    </Flex>
  )
}