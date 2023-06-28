"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Cart = string[];
const cartContext = createContext<{
  cart: Cart;
  setCart: Dispatch<SetStateAction<string[]>>;
}>({
  cart: [],
  setCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

export default () => useContext(cartContext);
