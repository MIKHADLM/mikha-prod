import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import { Helmet } from "react-helmet";

// Liste complète des vidéos
const videoLinks = [
  { id: "O0Ys-U2_FEE", date: "2024\nCréation intégrale", description: "TEST" },
  { id: "dFraOpFdEy0", date: "2024\nMontage - Colorimétrie" },
  { id: "ZVE95wJM9is", date: "2024\nCréation intégrale" },
  { id: "rpgbOMxSljk", date: "2024\nCréation intégrale" },
  { id: "86rCW1UEFKA", date: "2024\nRéalisation - Montage" },
  { id: "EOI3If7TVyQ", date: "2024\nInterview - Motion Design - Montage" },
  { id: "gDHglCewJVY", date: "2024\nCréation intégrale" },
  { id: "sluhYQHknao", date: "2023\nCréation intégrale" },
  { id: "O-W1xYAm1_U", date: "2023\nCréation intégrale" },
  { id: "6U9_wur4HYI", date: "2023\nRéalisation" },
  { id: "CBdkIpn6DXA", date: "2023\nCréation intégrale" },
  { id: "Z0_4QqZ2Kds", date: "2023\nCréation intégrale" },
  { id: "yg2-kGgDzWc", date: "2023\nCréation intégrale" },
  { id: "x_r44LMz5mM", date: "2022\nCréation intégrale" },
  { id: "lGEnx4fI55Y", date: "2022\nCréation intégrale" },
  { id: "imncgWS0T44", date: "2022\nCréation intégrale" },
  { id: "0LUBZK_XaVo", date: "2022\nCoréalisation intégrale" },
  { id: "FvXFbHNVub8", date: "2021\nCoréalisation intégrale" },
  { id: "6D30Fw37Zag", date: "2020\nCoréalisation intégrale" },
  { id: "sZkU38eOzSs", date: "2020\nCoréalisation intégrale" },
  { id: "rO9bcfW52qM", date: "2020\nRéalisation - Montage - Titrage" },
  { id: "pbRF4prArZo", date: "2020\nCadrage - Montage" },
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

  // Fonction pour gérer la sélection d'une vidéo
  const handleThumbnailClick = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true); // Ouvre le modal
  };

  // Récupère la description de la vidéo sélectionnée
  const selectedVideoDetails = videoLinks.find((video) => video.id === selectedVideo);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Réalisation de Mikha, vidéaste indépendant de Lille</title>
        <meta
          name="description"
          content={
            selectedVideoDetails
              ? selectedVideoDetails.description
              : "Découvrez toutes les réalisations de Mikha, vidéaste freelance basé à Lille, avec des créations intégrales, des montages et des vidéos d'entreprise."
          }
        />
      </Helmet>

      {/* Barre de navigation */}
      <NavBar />

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid container spacing={1} style={{ margin: 0, width: "100%" }}>
          {videoLinks.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div
                className="relative group"
                style={{ cursor: "pointer" }}
                onClick={() => handleThumbnailClick(video.id)} // Gère le clic
              >
                {/* Miniature de la vidéo */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={`Miniature de la vidéo ${video.date.replace("\n", " - ")}`}
                  className="object-cover h-full w-full group-hover:opacity-25 group-focus:opacity-25 transition-opacity duration-300"
                /> 
                {/* Texte associé à la miniature */}
                <span className="absolute bottom-1 left-1 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:transition-opacity font-semibold">
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

      {/* Modal pour afficher le lecteur YouTube */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none scale-[0.5] md:scale-125 lg:scale-150">
          {selectedVideo && <YouTube videoId={selectedVideo} opts={opts} />}
        </Box>
      </Modal>
    </div>
  );
};

export default AllWork;
