import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="backdrop-blur-sm p-8">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl text-white font-extrabold">
          MIKHA
        </Link>
        <div className="flex items-center space-x-10">
          <Link to="/allwork" className="text-xl text-white hover:font-bold">
            ALL WORK
          </Link>
          <Link to="/about" className="text-xl text-white hover:font-bold">
            À PROPOS
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
