import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-sm p-4 lg:p-8">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl text-white font-bold">
          MIKHA
        </Link>

        {/* Menu Hamburger (visible uniquement sur mobile) */}
        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Liens de navigation */}
        <div
          className={`lg:flex items-center space-x-10 absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent z-50 transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          } lg:translate-y-0`}
        >
          <Link
            to="/allwork/"
            className="block lg:inline-block text-lg text-white hover:font-bold px-4 py-2 lg:py-0"
          >
            ALL WORK
          </Link>
          <Link
            to="/about/"
            className="block lg:inline-block text-lg text-white hover:font-bold px-4 py-2 lg:py-0"
          >
            À PROPOS
          </Link>
          <Link
            to="/contact/"
            className="block lg:inline-block text-lg text-white hover:font-bold px-4 py-2 lg:py-0"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
