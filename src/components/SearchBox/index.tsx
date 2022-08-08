import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Flex, IconButton, Input, useBreakpointValue } from "@chakra-ui/react";

import { RiSearchLine } from "react-icons/ri";

interface ISearchBox {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>
  onSubmit: (e: FormEvent) => Promise<void>;
  placeholder?: string;
}

export function SearchBox({ search, setSearch, onSubmit, placeholder = "Buscar" }: ISearchBox) {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="form"
      w="100%"
      px={["4", "6", "8", "10", "10", "12"]}
      py="5"
      borderWidth={1}
      borderRadius={6}
      borderColor="gray.150"
      mt={8}
      gap={8}
      onSubmit={e => onSubmit(e)}
      transition="1s"
    >

      <Input
        h={12}
        name="SearchBox"
        placeholder={placeholder}
        bg="gray.0"
        color="gray.800"
        value={search}
        onChange={e => setSearch(e.target.value)}
        _placeholder={{
          color: "gray.150"
        }}
        _hover={{
          opacity: 0.8
        }}
      />

      {isWideVersion ? <>
        <IconButton
          aria-label="Buscar"
          icon={<RiSearchLine />}
          bg="blue.500"
          type="submit"
          h={12}
          w={16}
          color="gray.1000"
          _hover={{ bg: "blue.700" }}
        />

        <Button
          type="button"
          bg="blue.600"
          onClick={() => setSearch("")}
          color="gray.0"
          h={12}
          _hover={{ bg: "blue.700" }}
        >
          Limpar
        </Button>
      </>
        :
        <IconButton
          aria-label="Buscar"
          icon={<RiSearchLine />}
          bg="blue.500"
          type="submit"
          h="12"
          w="16"
          color="gray.1000"
          _hover={{ bg: "blue.700" }}
        />
      }
    </Flex>
  )
}