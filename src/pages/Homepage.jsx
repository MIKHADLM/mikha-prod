import React from "react";
import { Link } from "react-router-dom"; // Import du composant Link pour la navigation
import video from "../assets/background-homepage.mp4";
import NavBar from "../components/NavBar";

const Homepage = () => {
  return (
    <div className="main">
      <video
        className="absolute z-10 w-full h-full object-cover"
        src={video}
        loop
        muted
        playsInline
        autoPlay
        style={{ zIndex: -1 }}
      />
      <NavBar />
      <div className="text-white text-xl lg:text-2xl absolute bottom-0 left-0 p-8">
        <div className="font-bold">MICHAEL PHILIBERT</div>
        <div>RÉALISATEUR / DA / CADREUR / MONTEUR / VIDÉASTE FREELANCE</div>
        <div className="mt-4 space-x-4">
          {/* Boutons de navigation */}
          <Link
            to="/allwork/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            All Work
          </Link>
          <Link
            to="/about/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            À propos
          </Link>
          <Link
            to="/contact/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
