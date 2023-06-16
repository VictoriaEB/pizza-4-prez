"use client";

import { useEffect, useState } from "react";
import { FaBars, FaPizzaSlice, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  const [hasBg, setHasBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasBg(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.scrollY]);

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
        <FaShoppingCart />
        <FaBars />
      </div>
    </nav>
  );
}
