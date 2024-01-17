import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="backdrop-blur-sm p-8">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold">
          MIKHA
        </Link>
        <div className="flex items-center space-x-10">
          <Link to="/allwork" className="text-white hover:font-bold">
            ALL WORK
          </Link>
          <Link to="/" className="text-white hover:font-bold">
            A PROPOS
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
