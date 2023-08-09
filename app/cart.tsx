"use client";

import useCart from "@/hooks/use-cart";
import { useEffect, useRef } from "react";

export default function Cart({ isOpen }: { isOpen: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const cart = useCart();

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      ref.current.style.marginBottom = `-${ref.current.clientHeight - 240}px`;
    } else {
      ref.current.style.marginBottom = "";
    }
  }, [cart, isOpen]);

  return (
    <>
      <h3
        className={`bg-red-700 left-0 right-0 transition-all absolute bottom-full text-2xl font-extrabold border-y border-white w-full px-4 py-3 ${
          isOpen ? "-mb-32 delay-200 duration-500" : "duration-300"
        }`}
      >
        Cart
      </h3>
      <div
        ref={ref}
        className={`max-h-screen overflow-y-auto grid pt-96 pb-10 min-h-[300px] grid-rows-[auto_1fr_auto] gap-6 transition-all overflow-hidden duration-700 justify-items-center absolute left-0 right-0 -z-10 bg-red-700 shadow-lg rounded-b-full bottom-full ${
          isOpen ? "shadow-[#ffffff66]" : "shadow-transparent"
        }`}
      >
        {cart.lineItems.length > 0 ? (
          <div className="w-full px-4 grid gap-8">
            <table className="border-separate border-spacing-y-1">
              <thead>
                <tr className={`transition-all duration-700`}>
                  <td>Name</td>
                  <td>Price</td>
                  <td className="text-center">Qty</td>
                </tr>
              </thead>
              <tbody className="font-medium">
                {cart.lineItems.map((lineItem, i) => (
                  <tr key={i} className={`transition-all duration-700`}>
                    <td className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {lineItem.product.name}
                    </td>
                    <td>$ {lineItem.price}</td>
                    <td className="flex justify-center gap-4">
                      <button
                        onClick={() => cart.removeProduct(lineItem.product.id)}
                        className="font-bold flex items-center justify-center leading-none"
                      >
                        -
                      </button>
                      <span className="w-5 text-center">
                        {lineItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          cart.addProduct(lineItem.product, lineItem.price)
                        }
                        className="font-bold flex items-center justify-center leading-none"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className={`transition-all duration-700`}>
                  <td className="text-right pr-4">Subtotal:</td>
                  <td className="font-medium">
                    $ {cart.getSubtotal().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button className="bg-amber-600 px-8 py-4 rounded-3xl justify-self-center self-end">
              Check Out
            </button>
          </div>
        ) : (
          <i className="mt-16 self-center">Your cart is empty.</i>
        )}
      </div>
    </>
  );
}
