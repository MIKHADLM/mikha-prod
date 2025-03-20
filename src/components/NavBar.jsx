import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Récupère l'URL actuelle

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm p-4 lg:p-8">
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
            ALL WORK
          </Link>
          <Link
            to="/about/"
            className={`text-lg text-white ${
              location.pathname === "/about/" ? "font-bold" : "hover:font-bold"
            }`}
          >
            À PROPOS
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
