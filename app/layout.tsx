import "./globals.css";
import NavBar from "./navbar";
import Footer from "./footer";
import { CartProvider } from "@/hooks/use-cart";

export const metadata = {
  title: "Pizza 4 Prez",
  description: "This is pizza for prez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <CartProvider>
        <body className="grid bg-stone-800 grid-rows-[auto_1fr_auto] min-h-screen max-w-md mx-auto">
          <NavBar />
          {children}
          <Footer />
        </body>
      </CartProvider>
    </html>
  );
}
