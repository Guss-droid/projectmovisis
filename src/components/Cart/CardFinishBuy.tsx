import { Box, Flex, IconButton, Image, Input, Text } from "@chakra-ui/react";
import { IBook } from ".";

import { BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ICardFinish {
  id: number;
  image?: string;
  name?: string;
  price?: string;
  amount: number;
  cart: IBook;
  removeProduct: (bookId: number) => void;
  incrementBook: (cart: IBook) => void;
  decrementBook: (cart: IBook) => void;
}

export function CardFinishBuy({
  id,
  name,
  cart,
  price,
  image,
  amount,
  incrementBook,
  decrementBook,
  removeProduct,
}: ICardFinish) {
  return (
    <Flex
      align="center"
      w="100%"
      flexDir={["column", "column", "row", "row", "row"]}
    >
      <Image
        src={image}
        alt="Capa do livro"
        h={[28, 32, 36]}
        w={[28, 32, 36]}
      />

      <Box w="100%">
        <Flex
          justify={["center", "center", "space-between", "space-between"]}
          w="90%"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={2}
        >
          <Text>{name}</Text>
          <Text fontWeight={600}>{price}</Text>
        </Flex>

        <Flex
          mt={2}
          align="center"
          gap={6}
          flexDir={["column", "column", "row", "row", "row"]}
        >
          <Flex
            align="center"
            justify="center"
            borderRadius={8}
            bg="gray.150"
          >
            <IconButton
              aria-label="Decrement amount"
              icon={<AiOutlineMinus />}
              variant="ghost"
              color="blue.600"
              onClick={() => decrementBook(cart)}
              zIndex={3}
              disabled={amount === 1}
              _hover={{ opacity: 0.7 }}
            />

            <Input
              value={amount}
              w={12}
              border={0}
              readOnly
              mx={-2}
            />

            <IconButton
              aria-label="Increment amount"
              icon={<AiOutlinePlus />}
              variant="ghost"
              color="blue.600"
              onClick={() => incrementBook(cart)}
              _hover={{ opacity: 0.7 }}
            />
          </Flex>

          <IconButton
            aria-label="Excluir"
            icon={<BsTrash />}
            bg="blue.700"
            color="blue.100"
            onClick={() => removeProduct(id)}
            _hover={{ opacity: 0.7 }}
          />
        </Flex>
      </Box>
    </Flex>
  )
}