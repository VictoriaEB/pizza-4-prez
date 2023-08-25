"use client";

import useCart from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cart = useCart();
  const [orderId, setOrderId] = useState<string>();

  useEffect(() => {
    const orderId = searchParams.get("order");
    if (!orderId) {
      router.push("/");
      return;
    }

    cart.clear();
    setOrderId(orderId);
  }, []);

  return (
    <section className="text-center grid items-center relative -mt-20 px-4 pt-20 min-h-[100vh]">
      <Image
        className="object-cover"
        alt="PizzaBackground"
        src="https://pizza-for-president.vercel.app/static/media/pizza-3.f2f9b9a49128f877c57f.jpg"
        fill
        priority
      />
      <div className="absolute bg-black top-0 bottom-0 right-0 left-0 opacity-50" />
      {!!orderId && (
        <div className="relative text-white font-extrabold grid gap-4 max-w-sm">
          <h1 className="rounded-br-full uppercase border-r-8 border-b-8 text-4xl border-orange-500 pr-2 pb-2">
            Thank You
          </h1>
          <h2 className="text-2xl">We received your order</h2>
          <Link
            href={`/order-status?orderId=${1}`}
            className="px-8 py-4 bg-red-600 text-xl rounded-full uppercase"
          >
            check status
          </Link>
        </div>
      )}
    </section>
  );
}
