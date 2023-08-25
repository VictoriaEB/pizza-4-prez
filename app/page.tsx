import Image from "next/image";
import ProductCard from "./product-card";
import stripe from "@/services/stripe";

export default async function Home() {
  const { products, prices } = await Promise.all([
    stripe.products.list(),
    stripe.prices.list(),
  ]).then(([prodRes, priceRes]) => ({
    products: prodRes.data,
    prices: priceRes.data,
  }));

  const entrees = products.filter((p) => p.description!.includes("•"));
  const desserts = products.filter((p) => !p.description!.includes("•"));
  const randomDessert =
    desserts[Math.round(Math.random() * (desserts.length - 1))];
  return (
    <main>
      <section className="grid items-center relative -mt-20 px-4 pt-20 min-h-[100vh]">
        <Image
          className="object-cover"
          alt="PizzaBackground"
          src="https://pizza-for-president.vercel.app/static/media/pizza-3.f2f9b9a49128f877c57f.jpg"
          fill
          priority
        />
        <div className="absolute bg-black top-0 bottom-0 right-0 left-0 opacity-50" />
        <div className="relative text-white font-extrabold grid gap-4 max-w-sm">
          <h1 className="rounded-br-full uppercase border-r-8 border-b-8 text-4xl border-orange-500 pr-2 pb-2">
            Greatest Pizza Ever
          </h1>
          <h2 className="text-2xl">Ready in seconds!</h2>
          <button className="px-8 py-4 bg-red-600 text-xl rounded-full uppercase">
            Place Order
          </button>
        </div>
      </section>
      <section className="bg-stone-800 text-white grid py-12 gap-10 px-4">
        <h3 className="text-2xl font-extrabold uppercase">
          Choose your favorite
        </h3>
        {entrees.map((e, i) => (
          <ProductCard
            key={i}
            price={prices.find((p) => p.product === e.id)!}
            product={e}
            type="entree"
          />
        ))}
      </section>
      <section className="bg-stone-800">
        <div className="relative rounded-full overflow-hidden aspect-square">
          <Image
            className="object-cover"
            alt={randomDessert.name}
            src={randomDessert.images[0]}
            fill
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
          <div className="relative grid text-white gap-6 justify-items-center text-center px-4 pt-24 pb-16">
            <h4 className="text-4xl font-extrabold">{randomDessert.name}</h4>
            <p className="text-xl font-bold">{randomDessert.description}</p>
            <button className="px-8 py-4 bg-yellow-500 font-extrabold text-xl rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </section>
      <section className="bg-stone-800 text-white grid py-12 gap-10 px-4">
        {desserts.map((d, i) => (
          <ProductCard
            key={i}
            price={prices.find((p) => p.product === d.id)!}
            product={d}
            type="dessert"
          />
        ))}
      </section>
    </main>
  );
}
