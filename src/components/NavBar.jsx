import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Récupère l'URL actuelle
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

  // 🔥 Remonte en haut quand la page change
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
        <div className="lg:flex items-center space-x-10">
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
      </div>
    </nav>
  );
};

export default NavBar;
