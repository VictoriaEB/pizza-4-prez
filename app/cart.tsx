"use client";

import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";

export default function Cart({ isOpen }: { isOpen: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const cart = useCart();
  const router = useRouter();

  function open(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;
    ref.current.style.marginBottom = `-${ref.current.clientHeight - 240}px`;
  }
  function close(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;
    ref.current.style.marginBottom = "";
  }

  useEffect(() => (isOpen ? open : close)(ref), [isOpen]);

  useEffect(() => {
    if (!ref.current || !cart.lineItems.length || isOpen) return;
    open(ref);
    setTimeout(close, 1500, ref);
  }, [cart]);

  async function handleCheckout() {
    fetch("/api/checkout-sessions", {
      method: "POST",
      body: JSON.stringify(
        cart.lineItems.map((lineItem) => ({
          price: lineItem.price.id,
          quantity: lineItem.quantity,
        }))
      ),
    })
      .then((r) => r.text())
      .then(router.push);
  }

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
        className={`max-h-screen overflow-y-auto grid pt-96 pb-10 min-h-[300px] gap-6 transition-all overflow-hidden duration-700 justify-items-center absolute left-0 right-0 -z-10 bg-red-700 shadow-lg rounded-b-full bottom-full ${
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
                  <td className="text-center pl-4">Qty</td>
                </tr>
                <tr>
                  <td colSpan={3} className="bg-white" />
                </tr>
              </thead>
              <tbody className="font-medium">
                {cart.lineItems.map((lineItem, i) => (
                  <tr key={i} className={`transition-all duration-700`}>
                    <td className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {lineItem.product.name}
                    </td>
                    <td>$ {lineItem.price.unit_amount! / 100}</td>
                    <td className="before:content-[''] before:bg-white before:h-[30px] before:-my-[3px] before:w-[2px] flex justify-center gap-4">
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
                        onClick={() => cart.addLineItem(lineItem)}
                        className="font-bold flex items-center justify-center leading-none"
                      >
                        +
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="bg-white" />
                </tr>
                <tr className={`transition-all duration-700`}>
                  <td className="text-right pr-4">Subtotal:</td>
                  <td className="font-medium">
                    $ {cart.getSubtotal().toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button
              onClick={handleCheckout}
              className="bg-amber-600 px-8 py-4 rounded-3xl justify-self-center self-end"
            >
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
