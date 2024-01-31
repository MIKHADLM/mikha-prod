import React from "react";
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
        <div className=" font-bold ">MICHAEL PHILIBERT</div>
        <div>RÉALISATEUR / DA / CADREUR / MONTEUR / VIDÉASTE FREELANCE</div>
      </div>
    </div>
  );
};

export default Homepage;
