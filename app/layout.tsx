import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPizzaSlice,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./globals.css";

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
      <body>
        <nav className="flex sticky justify-between p-4 text-white font-extrabold items-center z-10">
          <div className="text-3xl">PIZZA</div>
          <div className="flex text-lg gap-2 items-center">
            MENU
            <FaPizzaSlice className="text-3xl" />
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-[#0d0909] text-white grid p-4 gap-4 justify-items-center text-center padding">
          <div>PIZZA</div>
          <div className="inline-flex">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedin />
          </div>
        </footer>
      </body>
    </html>
  );
}
