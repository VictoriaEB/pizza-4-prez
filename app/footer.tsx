import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white bg-stone-800 text-white grid px-4 py-6 gap-6 justify-items-center text-center padding">
      <div className="text-xl font-extrabold">PIZZA</div>
      <div className="inline-flex gap-6 text-2xl">
        <a href="https://www.facebook.com/">
          <FaFacebook />
        </a>
        <a href="https://twitter.com/?lang=en">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/">
          <FaYoutube />
        </a>
        <a href="https://www.linkedin.com/">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
