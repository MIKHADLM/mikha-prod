import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";

const videoLinks = [
  { id: "O0Ys-U2_FEE", date: "2024\nCréation intégrale" },
  { id: "dFraOpFdEy0", date: "2024\nMontage - Colorimétrie" },
  // Ajoute les autres vidéos ici...
];

const AllWork = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <NavBar />
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid container spacing={1} style={{ margin: 0, width: "100%" }}>
          {videoLinks.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div
                className="relative group"
                onClick={() => setSelectedVideo(video.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Miniature */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt="thumbnail"
                  className="object-cover h-full w-full group-hover:opacity-25 group-focus:opacity-25"
                />
                {/* Texte */}
                <span className="absolute bottom-1 left-1 text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 font-semibold">
                  {video.date.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Modal pour le lecteur YouTube */}
      <Modal open={open} onClose={() => setSelectedVideo(null)}>
        <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none scale-[0.5] md:scale-125 lg:scale-150">
          <YouTube videoId={selectedVideo} opts={opts} />
        </Box>
      </Modal>
    </div>
  );
};

export default AllWork;
