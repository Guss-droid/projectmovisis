import { Button, Flex, Image, Input, Text, useColorMode } from "@chakra-ui/react";

interface ICardBook {
  image: string;
  name: string;
  price: string;
  data: string;
  author: string;
  id: number;
  addProduct: (id: number) => void;
  amount: number;
}

export function CardBook({
  id,
  name,
  data,
  image,
  price,
  author,
  amount,
  addProduct,
}: ICardBook) {

  const { colorMode } = useColorMode()

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="center"
      bg={colorMode === "light" ? "gray.50" : "gray.900"}
      color={colorMode === "light" ? "gray.900" : "gray.50"}
      borderRadius="8px 32px"
      w={60}
      p={4}
    >
      <Image
        src={image}
        alt="Capa do livro"
        w={[36, 40, 48]}
        h={[36, 40, 48]}
      />

      <Flex flexDir="column" mt={2}>
        <Text>
          {name}
        </Text>
        <Text>{author}</Text>

        <Text>{price}</Text>
        <Text>{data}</Text>
      </Flex>

      <Flex gap={[3, 6]} mt={4}>
        <Button
          bg="blue.500"
          color="gray.50"
          onClick={() => addProduct(id)}
          _hover={{ bg: "blue.700" }}
        >
          Adicionar
        </Button>

        <Input
          name="amount"
          w={12}
          readOnly
          alignContent="center"
          value={amount}
        />
      </Flex>
    </Flex>
  )
}