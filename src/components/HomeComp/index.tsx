import { FormEvent, useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Text, useToast } from "@chakra-ui/react";

import { CardBook } from "../CardBook";
import { SearchBox } from "../SearchBox";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formats";
import { useCart } from "../../context/CartContext";

interface IBooksData {
  id: number;
  author: string;
  name: string;
  priceFormatted: string;
  includeDate: string;
  image: string;
  price: number;
}

interface ICartAmount {
  [key: number]: number;
}

export function HomeComp() {

  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<IBooksData[]>([])

  const toast = useToast()
  const { addProduct, cart } = useCart()

  const cartAmount = cart.reduce((sum, product) => {
    const newSumAmount = { ...sum }
    newSumAmount[product.id] = product.amount

    return newSumAmount
  }, {} as ICartAmount)

  useEffect(() => {
    async function getBooks() {
      try {
        const res = await api.get<IBooksData[]>("/books")

        const newBooks = res.data.map(books => ({
          ...books,
          priceFormatted: formatPrice(books.price),
        }))

        setProducts(newBooks)
      } catch {
        toast({
          title: "Erro ao pegar livros",
          status: "error",
          isClosable: true,
          duration: 4000,
          position: "top-right",
        })
      }
    }

    getBooks()
  }, [])

  async function searchBooks(e: FormEvent) {
    e.preventDefault()
    try {
      const res = await api.get<IBooksData[]>(`/books?name=${search}`)

      const newBooks = res.data.map(books => ({
        ...books,
        priceFormatted: formatPrice(books.price),
      }))

      setProducts(newBooks)
    } catch {
      toast({
        title: "Livro não encontrado",
        status: "error",
        isClosable: true,
        duration: 4000,
        position: "top-right",
      })
    }
  }

  function orderBooksByPrice() {
    const newProducts = [...products];
    setProducts(newProducts.sort((a, b) => b.price - a.price));
  }

  function orderBooksByDate() {
    const newProducts = [...products];
    setProducts(newProducts.sort((a, b) => {
      if (a.includeDate > b.includeDate) return 1
      if (a.includeDate < b.includeDate) return -1
      return 0
    }));
  }

  return (
    <Flex w="100%" mx={5} flexDir="column">
      <SearchBox
        onSubmit={e => searchBooks(e)}
        search={search}
        setSearch={setSearch}
        placeholder="Buscar por nome do livro"
      />

      <Box
        mt={2}
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={18}>
          Ordenar por:
        </Text>

        <Flex
          gap={6}
          mt={4}
          color="gray.0"
        >
          <Button
            bg="blue.600"
            onClick={() => orderBooksByPrice()}
            _hover={{ bg: "blue.700" }}
            _focus={{ bg: "blue.500" }}
          >
            Preço
          </Button>

          <Button
            bg="blue.600"
            onClick={() => orderBooksByDate()}
            _hover={{ bg: "blue.700" }}
            _focus={{ bg: "blue.500" }}
          >
            Data
          </Button>
        </Flex>
      </Box>

      <Flex align="center" justify="center">
        <Grid
          templateColumns={["1fr", "repeat(2, 2fr)", "repeat(3, 2fr)", "repeat(4, 2fr)"]}
          gap={[6, 8, 12, 16]}
          my={12}
        >
          {products.map(book => (
            <CardBook
              key={book.id}
              author={book.author}
              data={book.includeDate}
              id={book.id}
              image={book.image}
              name={book.name}
              addProduct={() => addProduct(book.id)}
              price={book.priceFormatted}
              amount={cartAmount[book.id] || 0}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  )
}