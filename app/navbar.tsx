"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaPizzaSlice, FaShoppingCart } from "react-icons/fa";
import Cart from "./cart";

export default function NavBar() {
  const [hasBg, setHasBg] = useState(false);
  const [isOpen, setIsOpen] = useState<"cart" | "menu" | null>(null);

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
      <Link
        href="/"
        className="gap-2 items-center grid grid-cols-[1fr_auto] leading-none"
      >
        <FaPizzaSlice className="text-3xl " />
        <div className="grid">
          Pizza
          <span>4 Prez</span>
        </div>
      </Link>
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
          <Link href="/order-status">Order Status</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/contact-us">Contact Us</Link>
          <Link href="/our-story">Our Story</Link>
        </div>
      </div>
      <Cart isOpen={isOpen === "cart"} />
    </nav>
  );
}
