import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import des icônes

const NavBar = ({ setMenuOpen, menuOpen }) => {
  const location = useLocation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Remonter la page quand l'URL change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-sm p-4 lg:p-8 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-bold">
          MIKHA
        </Link>

        {/* Icône burger ou croix */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center space-x-10">
          <Link
            to="/allwork/"
            className={`text-lg text-white ${
              location.pathname === "/allwork/" ? "font-bold" : "hover:font-bold"
            }`}
          >
            PORTFOLIO
          </Link>
          <Link
            to="/about/"
            className={`text-lg text-white ${
              location.pathname === "/about/" ? "font-bold" : "hover:font-bold"
            }`}
          >
            À PROPOS
          </Link>
          <Link
            to="/Contact/"
            className={`text-lg text-white ${
              location.pathname === "/Contact/" ? "font-bold" : "hover:font-bold"
            }`}
          >
            CONTACT
          </Link>
        </div>

        {/* Menu mobile */}
        <div
          className={`${
            menuOpen
              ? "fixed top-0 right-0 w-3/4 h-screen bg-gray-800 bg-opacity-75 text-white transition-transform duration-300 translate-x-0"
              : "fixed top-0 right-[-100%] w-3/4 h-screen bg-gray-800 bg-opacity-75 text-white transition-transform duration-300"
          } lg:hidden flex flex-col items-center pt-20 space-y-6`}
        >
          {/* Bouton pour fermer le menu mobile */}
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <Link
            to="/allwork/"
            className="text-lg hover:font-bold"
            onClick={() => setMenuOpen(false)}
          >
            PORTFOLIO
          </Link>
          <Link
            to="/about/"
            className="text-lg hover:font-bold"
            onClick={() => setMenuOpen(false)}
          >
            À PROPOS
          </Link>
          <Link
            to="/Contact/"
            className="text-lg hover:font-bold"
            onClick={() => setMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
