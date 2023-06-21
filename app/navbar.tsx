"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaPizzaSlice, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  const [hasBg, setHasBg] = useState(false);
  const [isOpen, setIsOpen] = useState<"cart" | "menu" | null>(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleScroll = () => setHasBg(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex top-0 transition duration-300 sticky justify-between p-4 text-white font-extrabold items-center z-10 ${
        hasBg ? "bg-stone-900 shadow" : ""
      }`}
    >
      <div className="gap-2 items-center grid grid-cols-[1fr_auto] leading-none">
        <FaPizzaSlice className="text-3xl " />
        <div className="grid">
          Pizza
          <span>4 Prez</span>
        </div>
      </div>
      <div className="flex text-3xl gap-8">
        <FaShoppingCart
          onClick={() => setIsOpen((o) => (o === "cart" ? null : "cart"))}
        />
        <FaBars
          onClick={() => setIsOpen((o) => (o === "menu" ? null : "menu"))}
        />
      </div>
      <div
        className={`overflow-hidden grid content-start text-xl absolute top-0 -z-10 transition-all bg-stone-900 duration-500 right-0 aspect-square rounded-bl-full ${
          isOpen === "menu" ? "w-full" : "w-0"
        }`}
      >
        <div className="right-0 w-80 grid gap-6 p-4 mt-16 text-right absolute">
          <div>Order Status</div>
          <div>Locations</div>
          <Link href="/contact-us">Contact Us</Link>
          <div>Our Story</div>
        </div>
      </div>

      <div
        className={`max-h-screen overflow-y-auto grid pt-16 pb-10 min-h-[300px] grid-rows-[auto_1fr_auto] gap-6 transition-all overflow-hidden duration-700 justify-items-center absolute left-0 right-0 -z-10 bg-red-700 shadow rounded-b-full ${
          isOpen === "cart" ? "top-0" : "-top-80"
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
                    isOpen === "cart" ? "h-6" : "h-0"
                  }`}
                >
                  Item number {lineItem}
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
    </nav>
  );
}
