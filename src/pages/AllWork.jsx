import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import { PopupWidget } from "react-calendly";

// Liste complète des vidéos
const videoLinks = [
  { id: "O0Ys-U2_FEE", category: ["Clip musicaux"], date: "2024\nCréation intégrale", description: "TEST" },
  { id: "KDkNl5MbF_k", category: ["Publicité"], date: "2024\nMontage - Colorimétrie", description: "TEST" },
  { id: "dFraOpFdEy0", category: ["Publicité"], date: "2024\nMontage - Colorimétrie" },
  { id: "ZVE95wJM9is", category: ["Vidéos YouTube"], date: "2024\nCréation intégrale" },
  { id: "rpgbOMxSljk", category: ["Vidéos YouTube"], date: "2024\nCréation intégrale" },
  { id: "86rCW1UEFKA", category: ["Vidéos YouTube"], date: "2024\nRéalisation - Montage" },
  { id: "EOI3If7TVyQ", category: ["Vidéos YouTube"], date: "2024\nInterview - Motion Design - Montage" },
  { id: "gDHglCewJVY", category: ["Vidéos YouTube"], date: "2024\nCréation intégrale" },
  { id: "sluhYQHknao", category: ["Clip musicaux"], date: "2023\nCréation intégrale" },
  { id: "O-W1xYAm1_U", category: ["Vidéos YouTube", "Clip musicaux"], date: "2023\nCréation intégrale" },
  { id: "ECOo4thLKDU", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "UI7MMOgIXsU", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "86VfBropop8", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "_UY40shea04", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "OGMQz6qc7n4", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "8BaWi8OhkAA", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "bnxD8wXO354", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "uFFZNJLYuX0", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "oPlys0qw6aI", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "_pxjMa0HAsc", category: ["Vidéos YouTube"], date: "2023\nMontage" },
  { id: "6U9_wur4HYI", category: ["Clip musicaux"], date: "2023\nRéalisation" },
  { id: "CBdkIpn6DXA", category: ["Clip musicaux"], date: "2023\nCréation intégrale" },
  { id: "Z0_4QqZ2Kds", category: ["Clip musicaux"], date: "2023\nCréation intégrale" },
  { id: "yg2-kGgDzWc", category: ["Clip musicaux", "Publicité"], date: "2023\nCréation intégrale" },
  { id: "x_r44LMz5mM", category: ["Clip musicaux", "Publicité"], date: "2022\nCréation intégrale" },
  { id: "lGEnx4fI55Y", category: ["Clip musicaux", "Publicité"], date: "2022\nCréation intégrale" },
  { id: "imncgWS0T44", category: ["Clip musicaux"], date: "2022\nCréation intégrale" },
  { id: "0LUBZK_XaVo", category: ["Publicité"], date: "2022\nCoréalisation intégrale" },
  { id: "FvXFbHNVub8", category: ["Clip musicaux"], date: "2021\nCoréalisation intégrale" },
  { id: "6D30Fw37Zag", category: ["Clip musicaux"], date: "2020\nCoréalisation intégrale" },
  { id: "sZkU38eOzSs", category: ["Clip musicaux"], date: "2020\nCoréalisation intégrale" },
  { id: "rO9bcfW52qM", category: ["Clip musicaux"], date: "2020\nRéalisation - Montage - Titrage" },
  { id: "pbRF4prArZo", category: ["Publicité", "Clip musicaux"], date: "2020\nCadrage - Montage" },
];

// Liste des catégories
const categories = ["Toutes les vidéos", "Clip musicaux", "Publicité", "Vidéos YouTube", "Vidéos courtes"];

const AllWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes les vidéos");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);  // Ajout de l'état pour ouvrir/fermer le menu mobile

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  // Fonction pour filtrer les vidéos selon la catégorie
  const filteredVideos = selectedCategory === "Toutes les vidéos"
    ? videoLinks
    : videoLinks.filter(video => video.category.includes(selectedCategory)); // Utilisation de includes()

  // Fonction pour gérer la sélection d'une vidéo
  const handleThumbnailClick = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true); // Ouvre le modal
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden pt-24 px-0">
      {/* Barre de navigation */}
      <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} /> {/* Passer les props */}

      {/* Boutons de filtrage */}
{/* Boutons de filtrage */}
<div className="flex flex-wrap justify-center gap-4 mb-6">
  {categories.map((category, index) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg w-32"
    >
      {category}
    </button>
  ))}
</div>

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid container spacing={1} style={{ margin: 0, width: "100%" }}>
          {filteredVideos.map((video, index) => (
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
                  className="w-full h-auto block object-cover group-hover:opacity-25 group-focus:opacity-25 transition-opacity duration-300"
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

      {/* Widget Calendly */}
      <div className="flex justify-center mt-6">
        <PopupWidget
          url="https://calendly.com/mikha-vizion/30min"
          rootElement={document.getElementById("root")}
          text="Réserver un appel !"
          textColor="#ffffff"
          color="#4f46e5"
        />
        
      </div>
      <Footer />
    </div>
    
  );
  
};

export default AllWork;
