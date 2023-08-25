import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative">
      <Image
        className="object-cover blur-md"
        alt="PizzaBackground"
        src="https://pizza-for-president.vercel.app/static/media/pizza-3.f2f9b9a49128f877c57f.jpg"
        fill
        priority
      />
      <div className="grid justify-items-center content-center h-full text-white relative text-4xl font-extrabold text-center uppercase">
        <code>404</code>
        <h1>Toppings not found...</h1>
      </div>
    </div>
  );
}
