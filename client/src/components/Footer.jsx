import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 20); //200
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-orange-500 shadow-inner mt-16 relative">
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-orange-400 font-bold text-lg mb-3">What2Watch</h3>
          <p className="text-sm leading-relaxed break-words">
            Discover the latest trending movies and shows. Curated with ❤️ for
            movie lovers.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-orange-400 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/tv" className="hover:text-orange-400">
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/movie" className="hover:text-orange-400">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-orange-400">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-orange-400 font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-400">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400">
                Contact us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="text-orange-400 font-semibold mb-3">Newsletter</h4>
          <p className="text-sm mb-3">Stay updated with our latest picks.</p>
          <form className="flex flex-col sm:flex-row items-center">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:flex-1 px-3 py-2 rounded-md sm:rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none mb-3 sm:mb-0"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 sm:rounded-r-md sm:ml-1 rounded-md text-sm font-semibold text-white transition w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-5 px-4 sm:px-6 lg:px-20 flex flex-col sm:flex-row items-center justify-between text-sm text-white gap-y-3">
        <span className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} What2Watch. All rights reserved.
        </span>

        <div className="flex gap-4">
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 hover:text-orange-400 transition" />
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 hover:text-orange-400 transition" />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5 hover:text-orange-400 transition" />
          </a>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg z-50 transition"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
