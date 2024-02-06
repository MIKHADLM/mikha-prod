import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="backdrop-blur-sm p-4 lg:p-8">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-bold">
          MIKHA
        </Link>
        <div className="lg:flex items-center space-x-10">
          <Link to="/allwork/" className="text-lg text-white hover:font-bold">
            ALL WORK
          </Link>
          <Link to="/about/" className="text-lg text-white hover:font-bold">
            À PROPOS
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
