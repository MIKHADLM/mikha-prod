import React, { useState, useEffect, useMemo } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Box from "@mui/system/Box";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import { PopupWidget } from "react-calendly";
import { getVideos } from "../services/videosService";

// Liste complète des vidéos
const videoLinks = [
  { id: "dZvV-Izb4lw", category: ["Vidéos YouTube"], date: "2025\nMontage", description: "" },
  { id: "TbnVavXY8dg&t=2s", category: ["Vidéos YouTube"], date: "2025\nMontage", description: "" },
  { id: "BeR1bWRlPSc&t=2s", category: ["Vidéos YouTube"], date: "2025\nMontage", description: "" },
  { id: "O0Ys-U2_FEE", category: ["Clip musicaux"], date: "2024\nCréation intégrale", description: "" },
  { id: "KDkNl5MbF_k", category: ["Publicité"], date: "2024\nMontage - Colorimétrie", description: "" },
  { id: "dFraOpFdEy0", category: ["Publicité"], date: "2024\nMontage - Colorimétrie" },
  { id: "rpgbOMxSljk", category: ["Vidéos YouTube"], date: "2024\nCréation intégrale" },
  { id: "86rCW1UEFKA", category: ["Vidéos YouTube"], date: "2024\nRéalisation - Montage" },
  { id: "EOI3If7TVyQ", category: ["Vidéos YouTube"], date: "2024\nInterview - Motion Design - Montage" },
  { id: "ZVE95wJM9is", category: ["Vidéos YouTube"], date: "2024\nCréation intégrale" },
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
  { id: "SkJZhBoUlM0", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "n9C2Hk68dww", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "CN9Fe8ZCZlQ", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "F7_CpmpvO_k", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "PPL9blrjdac", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "-206cjTgAO4", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "4gu_6fcqtVw", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "ruSigNO2sJw", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "sPD8SlGURUI", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "Xb0FjQidkv8", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "yCSY9UdBpgM", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "pZEgYOTL8Eo", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "ZddVLGrgQLY", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "HoprO7hZ9jU", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "U4qDHIWvyig", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "YZUU464i0iY", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "WBJ46s76PAw", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "NMsPH5Dc7LQ", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "KJpatDlgMx0", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },
  { id: "ddRnSapFZtw", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },

  { id: "ABkhcjPXj4I", category: ["Vidéos courtes"], date: "2025\nCréation intégrale" },

  { id: "fUFfqi0NwVY", category: ["Vidéos courtes"], date: "2023\nCréation intégrale" },
];

// Liste des catégories
const categories = ["Toutes les vidéos", "Clip musicaux", "Publicité", "Vidéos YouTube", "Vidéos courtes"];

const AllWork = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes les vidéos");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);  // Ajout de l'état pour ouvrir/fermer le menu mobile
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [remoteVideos, setRemoteVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        console.log("VIDEOS FIRESTORE", data);
        if (Array.isArray(data) && data.length > 0) {
          setRemoteVideos(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des vidéos depuis Firestore", error);
      }
    };

    fetchVideos();
  }, []);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  // On utilise en priorité les vidéos venant de Firestore si elles existent,
  // sinon on retombe sur la liste locale codée en dur.
  const allVideosRaw = remoteVideos.length > 0 ? remoteVideos : videoLinks;

  // Filtrer les vidéos non visibles (visible === false)
  const allVideos = allVideosRaw.filter((video) => video.visible !== false);

  // Fonction pour filtrer les vidéos selon la catégorie
  const filteredVideos = selectedCategory === "Toutes les vidéos"
    ? allVideos
    : allVideos.filter(video => video.category?.includes(selectedCategory));

  // Fonction pour gérer la sélection d'une vidéo
  const handleThumbnailClick = (videoId) => {
    setSelectedVideo(videoId);
    setOpen(true); // Ouvre le modal
  };

  return (

    <div className="bg-black min-h-screen overflow-x-hidden pt-24 px-0">
      {/* Barre de navigation */}
      <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} /> {/* Passer les props */}

      {/* Contenu avec marges latérales */}
      <div className="px-4 md:px-8 lg:px-16">

        {/* Boutons de filtrage */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {/* Fusion Firestore + Patterns Gemini : tri par order, puis patterns dynamiques */}
            {(() => {
              // 1. Trier par order (priorité absolue)
              const sortedByOrder = [...filteredVideos].sort((a, b) => {
                const orderA = a.order || 999;
                const orderB = b.order || 999;
                return orderA - orderB;
              });

              // 2. Assigner patterns dynamiques si "Toutes les vidéos"
              if (selectedCategory === "Toutes les vidéos") {
                const videosWithPatterns = [...sortedByOrder];
                
                // Logique simple basée sur l'ordre exact
                for (let i = 0; i < videosWithPatterns.length; i++) {
                  const video = videosWithPatterns[i];
                  const isVertical = video.orientation === "vertical" || video.category?.includes("Vidéos courtes");
                  
                  // Garder le pattern existant si défini
                  if (video.pattern) continue;
                  
                  // Attribution basée sur la position dans l'ordre
                  if (i === 0) {
                    // Position 1 : hero si horizontal, side si vertical
                    video.pattern = isVertical ? "side" : "hero";
                  } else if (i === 1) {
                    // Position 2 : side si vertical, sinon hero
                    video.pattern = isVertical ? "side" : "hero";
                  } else if (i === 2 || i === 3) {
                    // Positions 3 et 4 : duo pour horizontales (2+2=4)
                    video.pattern = isVertical ? "side" : "duo";
                  } else {
                    // Positions 5+ : side pour verticales, duo pour horizontales
                    video.pattern = isVertical ? "side" : "duo";
                  }
                }
                
                return videosWithPatterns;
              }

              // 3. Sinon, retourner les vidéos triées par order
              return sortedByOrder;
            })().map((video, index) => {
              const isVertical = video.orientation === "vertical" || video.category?.includes("Vidéos courtes");
              const isShort = isVertical;

              // Logique de colSpan selon pattern Gemini
              let colSpan = "md:col-span-2";
              if (video.pattern === "hero") colSpan = "md:col-span-3";
              else if (video.pattern === "side") colSpan = "md:col-span-1";
              else if (isVertical) colSpan = "md:col-span-1";
              else if (!isVertical && video.pattern !== "duo") colSpan = "md:col-span-3";

              const thumbnailSrc =
                video.thumbnailUrl && video.thumbnailUrl.trim().length > 0
                  ? video.thumbnailUrl
                  : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;

              return (
                <div
                  key={index}
                  className={`relative group bg-black overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 hover:border-white/20 ${colSpan} ${
                    isVertical 
                      ? "aspect-[9/16]" // Verticale : ratio 9:16
                      : video.pattern === "duo" 
                        ? "aspect-video" // Duo : ratio 16:9 standard pour alignement
                        : "aspect-video md:aspect-auto h-full min-h-[300px]" // Hero : ratio flexible avec hauteur minimale
                  }`}
                  onClick={() => handleThumbnailClick(video.id)} // Gère le clic (desktop + mobile)
                  onMouseEnter={() => setHoveredVideo(video.id)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onTouchStart={() => setHoveredVideo(video.id)}
                  onTouchEnd={() => setHoveredVideo(null)}
                  onTouchCancel={() => setHoveredVideo(null)}
                >
                  
                  {hoveredVideo === video.id ? (
                    <YouTube
                      videoId={video.id}
                      opts={{
                        height: '100%',
                        width: '100%', 
                        playerVars: {
                          autoplay: 1,
                          controls: 0,
                          mute: 1,
                          rel: 0,
                          modestbranding: 1,
                          playsinline: 1,
                          loop: 1,
                          playlist: video.id // Nécessaire pour le loop
                        },
                      }}
                      className="w-full h-full pointer-events-none"
                      onReady={(e) => e.target.mute()}
                    />
                  ) : (
                    <img
                      src={thumbnailSrc}
                      alt={video.title || ""}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Badge */}
                  {isShort && (
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-xs font-semibold text-white px-2 py-1 rounded-full shadow-md">
                      Short
                    </span>
                  )}

                  {/* Overlay Texte */}
                  {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none z-20">
                    <span className="text-white font-bold text-lg leading-tight">
                        {video.title}
                    </span>
                    <span className="text-gray-300 text-sm mt-1 whitespace-pre-line">
                        {video.date}
                    </span>
                  </div> */}
                </div>
              );
            })}
          </div>
        </Box>

        {/* Modal pour afficher le lecteur YouTube */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none w-[90vw] md:w-[80vw] max-w-[1200px] aspect-video bg-black shadow-2xl">
             {selectedVideo && (
               <YouTube 
                 videoId={selectedVideo} 
                 opts={{
                   width: '100%',
                   height: '100%',
                   playerVars: { autoplay: 1 }
                 }} 
                 className="w-full h-full"
               />
             )}
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
    </div>
  );
};

export default AllWork;
