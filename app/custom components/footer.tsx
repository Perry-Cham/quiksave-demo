import { Facebook, X, Instagram, Linkedin} from "lucide-react"
function Footer() {
  const date = new Date();
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://facebook.com"
            className="text-2xl hover:text-red-500 transition"
          >
         <Facebook />
          </a>
          <a
            href="https://x.com"
            className="text-2xl hover:text-red-500 transition"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-2xl hover:text-red-500 transition"
          >
            <Instagram />
          </a>
          <a
            href="https://linkedin.com"
            className="text-2xl hover:text-red-500 transition"
          >
         <Linkedin />
          </a>
          <a
            href="https://wa.me/260977345462"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-red-500 transition"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        <div className="text-center text-gray-400">
          &copy; QuickSave {date.getFullYear()}
        </div>
      </div>
    </footer>
  );
}
export default Footer;
