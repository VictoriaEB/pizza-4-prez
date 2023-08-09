"use client";

import useCart from "@/hooks/use-cart";
import Image from "next/image";
import Stripe from "stripe";

type Props = {
  type: "entree" | "dessert";
  product: Stripe.Product;
  price: number;
};
export default function ProductCard({ type, product, price }: Props) {
  const cart = useCart();

  return (
    <div className="grid gap-6 text-center">
      <Image
        className="border-r-8 border-b-8 border-yellow-500 rounded-br-full h-72 object-cover"
        alt={product.name}
        src={product.images[0]}
        width={640}
        height={0}
      />
      <h4 className="text-4xl font-extrabold">{product.name}</h4>
      {type === "entree" ? (
        <ul className="list-disc ml-4 gap-x-8 text-left columns-2 justify-self-center capitalize">
          {product
            .description!.replace(/•/g, "")
            .split("\n")
            .map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
        </ul>
      ) : (
        product.description
      )}
      <div className="text-3xl font-extrabold italic">${price}</div>
      <button
        onClick={() => cart.addProduct(product, price)}
        className="bg-red-600 rounded-full uppercase text-xl font-bold py-4"
      >
        add to cart
      </button>
    </div>
  );
}
