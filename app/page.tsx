import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="grid items-center relative -mt-20 px-4 pt-20 min-h-screen">
        <Image
          className="object-cover"
          alt="PizzaBackground"
          src="https://pizza-for-president.vercel.app/static/media/pizza-3.f2f9b9a49128f877c57f.jpg"
          fill
        />
        <div className="absolute bg-black top-0 bottom-0 right-0 left-0 opacity-50" />
        <div className="relative text-white font-extrabold grid gap-4">
          <h1 className="rounded-br uppercase border-r-4 border-b-4 text-5xl border-orange-500 p-2">
            Greatest Pizza Ever
          </h1>
          <h2 className="text-2xl">Ready in seconds</h2>
          <button className="px-8 py-4 bg-red-600 text-xl rounded">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
