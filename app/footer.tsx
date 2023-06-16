import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white grid px-4 py-6 gap-6 justify-items-center text-center padding">
      <div className="text-xl font-extrabold">PIZZA</div>
      <div className="inline-flex gap-6 text-2xl">
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
        <FaYoutube />
        <FaLinkedin />
      </div>
    </footer>
  );
}
