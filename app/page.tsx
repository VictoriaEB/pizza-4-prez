import Image from "next/image";
import jsonData from "^home.json";

type ProductCardProps = {
  name: string;
  image: { alt: string; src: string };
  price: number;
  ingredients?: string[];
  description?: string;
};

function ProductCard({
  image,
  name,
  price,
  description,
  ingredients,
}: ProductCardProps) {
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
      <button className="bg-red-600 rounded-full uppercase text-xl font-bold py-4">
        add to cart
      </button>
    </div>
  );
}

export default function Home() {
  const { entrees, desserts } = jsonData;
  const randomDessert =
    desserts[Math.round(Math.random() * (desserts.length - 1))];
  return (
    <>
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
    </>
  );
}
