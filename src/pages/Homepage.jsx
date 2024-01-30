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
    </div>
  );
};

export default Homepage;
