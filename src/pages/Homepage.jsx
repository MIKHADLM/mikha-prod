import React, { useState } from "react";
import NavBar from "../components/NavBar"; // Importation de la NavBar
import video from "../assets/background-homepage.mp4";
import { PopupWidget } from "react-calendly";

const Homepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main">
      {/* Vidéo d'arrière-plan */}
      <video
        className="absolute z-10 w-full h-full object-cover"
        src={video}
        loop
        muted
        playsInline
        autoPlay
        style={{ zIndex: -1 }}
      />

      {/* Intégration de la NavBar qui contient déjà le MobileNavBar */}
      <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

      {/* Contenu texte */}
      <div className="text-white text-xl lg:text-2xl absolute bottom-0 left-0 p-8">
        <div className="font-bold">MICHAEL PHILIBERT</div>
        <div>RÉALISATEUR / DA / CADREUR / MONTEUR / VIDÉASTE FREELANCE</div>
      </div>

      {/* Widget Calendly */}
      <div className="flex justify-center mt-6">
        <PopupWidget
          url="https://calendly.com/mikha-vizion/30min"
          rootElement={document.getElementById("root")}
          text="Prendre un rendez-vous"
          textColor="#ffffff"
          color="#4f46e5"
        />
      </div>
    </div>
  );
};

export default Homepage;
