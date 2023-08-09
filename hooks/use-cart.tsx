"use client";
import { LineItem } from "@/services/stripe";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Stripe from "stripe";

type Cart = {
  lineItems: LineItem[];
  addProduct: (product: Stripe.Product, price: number) => void;
  removeProduct: (productId: string) => void;
  getSubtotal: () => number;
};

function throwUninitialized(value: string) {
  throw `${value} has not been initialized.`;
}

const cartContext = createContext<Cart>({
  lineItems: [],
  addProduct: () => throwUninitialized("addProduct"),
  removeProduct: () => throwUninitialized("removeProduct"),
  getSubtotal: () => Number.NaN,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [lineItems, setLineItems] = useState<LineItem[]>();

  useEffect(() => {
    async function loadCookie() {
      const lineItemsCookie = getCookie("_p4p_lineItems");
      if (lineItemsCookie) {
        await fetch(`/api/line-items/${encodeURIComponent(lineItemsCookie)}`)
          .then((r) => r.json())
          .then(setLineItems);
      }
    }
    loadCookie();
  }, []);

  useEffect(() => {
    if (!lineItems) return;

    if (lineItems.length) {
      setCookie(
        "_p4p_lineItems",
        lineItems
          .map((lineItem) => `${lineItem.product.id},${lineItem.quantity}`)
          .join("\n")
      );
    } else {
      deleteCookie("_p4p_lineItems");
    }
  }, [lineItems]);

  function addProduct(product: Stripe.Product, price: number) {
    setLineItems((lineItems) => {
      const updatedLineItems = [...(lineItems ?? [])];
      const lineItemIndex = updatedLineItems.findIndex(
        (lineItem) => lineItem.product.id === product.id
      );
      if (lineItemIndex === -1) {
        updatedLineItems.push({ product, price, quantity: 1 });
      } else {
        updatedLineItems[lineItemIndex].quantity++;
      }
      return updatedLineItems;
    });
  }
  function removeProduct(productId: string) {
    setLineItems((lineItems) => {
      const updatedLineItems = [...lineItems!];
      const lineItemIndex = updatedLineItems.findIndex(
        (lineItem) => lineItem.product.id === productId
      )!;
      if (updatedLineItems[lineItemIndex].quantity > 1) {
        updatedLineItems[lineItemIndex].quantity -= 1;
      } else {
        updatedLineItems.splice(lineItemIndex, 1);
      }
      return updatedLineItems;
    });
  }

  function getSubtotal() {
    return (
      lineItems?.reduce(
        (acc, lineItem) => acc + lineItem.price * lineItem.quantity,
        0
      ) ?? 0
    );
  }

  return (
    <cartContext.Provider
      value={{
        addProduct,
        lineItems: lineItems ?? [],
        removeProduct,
        getSubtotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default () => useContext(cartContext);
