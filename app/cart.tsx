"use client";

import useCart from "@/hooks/use-cart";

export default function Cart({ isOpen }: { isOpen: boolean }) {
  const { cart } = useCart();
  return (
    <div
      className={`max-h-screen overflow-y-auto grid pt-16 pb-10 min-h-[300px] grid-rows-[auto_1fr_auto] gap-6 transition-all overflow-hidden duration-700 justify-items-center absolute left-0 right-0 -z-10 bg-red-700 shadow rounded-b-full ${
        isOpen ? "top-0" : "-top-80"
      }`}
    >
      <h3 className="text-2xl font-extrabold border-y border-white w-full px-4 py-3">
        Cart
      </h3>

      {cart.length > 0 ? (
        <>
          <ul className="grid list-disc">
            {cart.map((lineItem, i) => (
              <li
                key={i}
                className={`transition-all duration-700 ${
                  isOpen ? "h-6" : "h-0"
                }`}
              >
                {lineItem.name}
              </li>
            ))}
          </ul>
          <button className="bg-amber-600 px-8 py-4 rounded-3xl justify-self-center self-end">
            Check Out
          </button>
        </>
      ) : (
        <i className="self-center">Your cart is empty.</i>
      )}
    </div>
  );
}
