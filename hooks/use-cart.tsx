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

type Cart = {
  lineItems: LineItem[];
  addLineItem: (lineItem: LineItem) => void;
  removeProduct: (productId: string) => void;
  getSubtotal: () => number;
  clear: () => void;
};

function throwUninitialized(value: string) {
  throw `${value} has not been initialized.`;
}

const cartContext = createContext<Cart>({
  lineItems: [],
  addLineItem: () => throwUninitialized("addProduct"),
  removeProduct: () => throwUninitialized("removeProduct"),
  getSubtotal: () => Number.NaN,
  clear: () => throwUninitialized("clear"),
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

  function addLineItem(lineItem: LineItem) {
    setLineItems((lineItems) => {
      const updatedLineItems = [...(lineItems ?? [])];
      const lineItemIndex = updatedLineItems.findIndex(
        (updatedLineItem) => updatedLineItem.product.id === lineItem.product.id
      );
      if (lineItemIndex === -1) {
        updatedLineItems.push({
          product: lineItem.product,
          price: lineItem.price,
          quantity: 1,
        });
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
        (acc, lineItem) =>
          acc + (lineItem.price.unit_amount! / 100) * lineItem.quantity,
        0
      ) ?? 0
    );
  }

  function clear() {
    deleteCookie("_p4p_lineItems");
    setLineItems([]);
  }

  return (
    <cartContext.Provider
      value={{
        addLineItem,
        lineItems: lineItems ?? [],
        removeProduct,
        getSubtotal,
        clear,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default () => useContext(cartContext);
