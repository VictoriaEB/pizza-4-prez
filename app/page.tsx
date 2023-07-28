import Image from "next/image";
import ProductCard from "./product-card";

type Entree = {
  name: string;
  image: { alt: string; src: string };
  price: number;
  ingredients: string[];
};

type Dessert = {
  name: string;
  image: { alt: string; src: string };
  price: number;
  description: string;
};

type StripeProduct = {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: any;
  description: string;
  images: string[];
  livemode: boolean;
  metadata: object;
  name: string;
  package_dimensions: any;
  shippable: any;
  statement_descriptor: any;
  tax_code: any;
  type: string;
  unit_label: any;
  updated: number;
  url: any;
};

type StripePrice = {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: any;
  livemode: boolean;
  lookup_key: any;
  metadata: object;
  nickname: any;
  product: string;
  recurring: any;
  tax_behavior: string;
  tiers_mode: any;
  transform_quantity: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

export default async function Home() {
  const [products, prices] = await Promise.all([
    fetch("https://api.stripe.com/v1/products", {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })
      .then((r) => r.json())
      .then((r) => r.data as StripeProduct[]),
    fetch("https://api.stripe.com/v1/prices", {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })
      .then((r) => r.json())
      .then((r) => r.data as StripePrice[]),
  ]);

  const entrees: Entree[] = products
    .filter((p) => p.description.includes("•"))
    .map((e) => ({
      name: e.name,
      ingredients: e.description.replace(/•/g, "").split("\n"),
      price: prices.find((p) => p.product === e.id)!.unit_amount / 100,
      image: { alt: e.name, src: e.images[0] },
    }));

  const desserts: Dessert[] = products
    .filter((p) => !p.description.includes("•"))
    .map((e) => ({
      name: e.name,
      description: e.description,
      price: prices.find((p) => p.product === e.id)!.unit_amount / 100,
      image: { alt: e.name, src: e.images[0] },
    }));

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
        {entrees.map((entree, i) => (
          <ProductCard key={i} {...entree} />
        ))}
      </section>
      <section className="bg-stone-800">
        <div className="relative rounded-full overflow-hidden aspect-square">
          <Image
            className="object-cover"
            alt={randomDessert.image.alt}
            src={randomDessert.image.src}
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
        {desserts.map((dessert, i) => (
          <ProductCard key={i} {...dessert} />
        ))}
      </section>
    </main>
  );
}
