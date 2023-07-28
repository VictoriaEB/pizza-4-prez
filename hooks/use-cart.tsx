"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import Stripe from "stripe";

type Cart = Stripe.Product[];
const cartContext = createContext<{
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
}>({
  cart: [],
  setCart: () => {
    throw "Cart not ready.";
  },
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>([]);
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}

export default () => useContext(cartContext);
