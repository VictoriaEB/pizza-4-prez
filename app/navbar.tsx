"use client";

import { useEffect, useState } from "react";
import { FaBars, FaPizzaSlice, FaShoppingCart } from "react-icons/fa";

export default function NavBar() {
  const [hasBg, setHasBg] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
        <FaShoppingCart onClick={() => setIsCartOpen(!isCartOpen)} />
        <FaBars onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <div
        className={`overflow-hidden grid content-start text-xl absolute top-0 -z-10 transition-all bg-stone-900 duration-500 right-0 aspect-square rounded-bl-full ${
          isMenuOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="right-0 w-80 grid gap-6 p-4 mt-16 text-right absolute">
          <div>Order Status</div>
          <div>Locations</div>
          <div>Contact Us</div>
          <div>Our Story</div>
        </div>
      </div>

      <div
        className={`grid gap-6 transition-all overflow-hidden duration-500 justify-items-center absolute left-0 right-0 top-0 -z-10 bg-red-700 shadow rounded-b-full ${
          isCartOpen ? "min-h-[50vw]" : "h-0"
        }`}
      >
        <div className="px-4 pt-16 pb-12 absolute">
          <h3 className="text-2xl font-extrabold border-b border-white w-full px-4 pb-3">
            Cart
          </h3>
          <ul className="grid gap-2 list-disc">
            <li>item1</li>
            <li>item2</li>
            <li>itemitemitem3</li>
            <li>item4</li>
            <li>item5</li>
          </ul>
          <button className="bg-amber-600 px-8 py-4 rounded-3xl justify-self-center self-end">
            Check Out
          </button>
        </div>
      </div>
    </nav>
  );
}
