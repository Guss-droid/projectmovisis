import { useToast } from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import { api } from "../services/api";

export interface IItemsData {
  id: number;
  amount: number;
  price: string;
  nome?: string;
  image?: string;
}

interface IUpdateProduct {
  idBook: number;
  amount: number;
}

interface ICartProvider {
  children: ReactNode;
}

interface ICartContextData {
  cart: IItemsData[];
  addProduct: (idBook: number) => Promise<void>;
  removeProduct: (idBook: number) => void;
  updateProductAmount: ({ idBook, amount }: IUpdateProduct) => void;
}

const CartContext = createContext({} as ICartContextData)

export function CartProvider({ children }: ICartProvider) {

  const [cart, setCart] = useState<IItemsData[]>(() => {
    const cookies = parseCookies(undefined)

    const cartOnCookies = cookies["cart"]

    if (cartOnCookies) {
      return JSON.parse(cartOnCookies)
    }

    return [];
  })

  const toast = useToast()
  const prevCartRef = useRef<IItemsData[]>()
  const cartPreviousValue = prevCartRef.current ?? cart

  useEffect(() => {
    prevCartRef.current = cart
  }, [])

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      setCookie(undefined, "cart", JSON.stringify(cart))
    }
  }, [cart, cartPreviousValue])

  async function addProduct(idBook: number) {
    try {
      const updateCart = [...cart]
      const productExists = updateCart.find(book => book.id === idBook)

      const currentAmount = productExists ? productExists.amount : 0

      const amount = currentAmount + 1

      if (productExists) {
        productExists.amount = amount
      } else {
        const product = await api.get(`/books/${idBook}`)

        const newProduct = {
          ...product.data,
          amount: 1
        }

        updateCart.push(newProduct)
      }

      setCart(updateCart)
    } catch (error) {
      toast({
        title: "Erro ao adicionar livro",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 4000
      })
    }
  }

  function removeProduct(idBook: number) {
    try {
      const updateCart = [...cart]
      const productIndex = updateCart.findIndex(book => book.id === idBook)

      if (productIndex >= 0) {
        updateCart.splice(productIndex, 1)
        setCart(updateCart)
      } else {
        throw Error()
      }

    } catch {
      toast({
        title: "Erro ao remover livro",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 4000
      })
    }
  }

  async function updateProductAmount({amount, idBook}: IUpdateProduct) {
    try {
      if(amount <= 0) {
        return
      }

      const updateCart = [...cart]
      const productExists = updateCart.find(book => book.id === idBook)

      if(productExists) {
        productExists.amount = amount

        setCart(updateCart)
      } else {
        throw Error()
      }

    } catch {
      toast({
        title: "Erro ao alterar quantidade de livros",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 4000
      })
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      addProduct,
      removeProduct,
      updateProductAmount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)