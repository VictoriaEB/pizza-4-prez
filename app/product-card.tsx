"use client";

import useCart from "@/hooks/use-cart";
import Image from "next/image";

type ProductCardProps = {
  name: string;
  image: { alt: string; src: string };
  price: number;
  ingredients?: string[];
  description?: string;
};

export default function ProductCard({
  image,
  name,
  price,
  description,
  ingredients,
}: ProductCardProps) {
  const { setCart } = useCart();
  return (
    <div className="grid gap-6 text-center">
      <Image
        className="border-r-8 border-b-8 border-yellow-500 rounded-br-full h-72 object-cover"
        alt={image.alt}
        src={image.src}
        width={640}
        height={0}
      />
      <h4 className="text-4xl font-extrabold">{name}</h4>
      {ingredients ? (
        <ul className="list-disc ml-4 gap-x-8 text-left columns-2 justify-self-center capitalize">
          {ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        description
      )}
      <div className="text-3xl font-extrabold italic">${price}</div>
      <button
        onClick={() => setCart((c) => [...c, name])}
        className="bg-red-600 rounded-full uppercase text-xl font-bold py-4"
      >
        add to cart
      </button>
    </div>
  );
}
