import React, { useState, useEffect, useMemo } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Box from "@mui/system/Box";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";
import { PopupWidget } from "react-calendly";
import { getVideos } from "../services/videosService";

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

  // Utiliser uniquement les vidéos de Firebase, triées par ordre croissant
  const allVideos = remoteVideos
    .filter((video) => video.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0)); // Ordre 0,1,2,3... du haut vers le bas

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

        {/* Filtres Stylisés */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                selectedCategory === cat
                  ? "bg-white text-black border-white scale-105"
                  : "bg-transparent text-zinc-500 hover:text-white border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {(() => {
              // Trier par ordre croissant et logger pour vérification
              const sortedVideos = [...filteredVideos].sort((a, b) => (a.order || 0) - (b.order || 0));
              console.log("Ordre AllWork:", sortedVideos.map(v => ({ title: v.title, order: v.order })));
              return sortedVideos;
            })().map((video, index) => {
              const isVertical = video.orientation === "vertical" || video.category?.includes("Vidéos courtes");
              const isShort = isVertical;

              // Layout dynamique basé sur l'index
              let colSpan = "md:col-span-2";
              if (isVertical) {
                colSpan = "md:col-span-1";  // Verticales toujours col-span-1
              } else {
                // Horizontales : modulo sur l'index pour varier les plaisirs
                if (index % 4 === 0) colSpan = "md:col-span-3";  // Hero
                else if (index % 4 === 1) colSpan = "md:col-span-1";  // Side
                else colSpan = "md:col-span-2";  // Duo
              }

              const thumbnailSrc =
                video.thumbnailUrl && video.thumbnailUrl.trim().length > 0
                  ? video.thumbnailUrl
                  : `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

              return (
                <div
                  key={video.id}
                  className={`relative group bg-black overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 hover:border-white/20 ${colSpan} ${
                    isVertical 
                      ? "aspect-[4/5] md:aspect-[9/16]" // Verticale : 4:5 mobile, 9:16 desktop
                      : colSpan === "md:col-span-2"
                        ? "aspect-video" // Duo : ratio 16:9 standard pour alignement
                        : "aspect-video md:aspect-auto h-full min-h-[300px]" // Hero : ratio flexible avec hauteur minimale
                  }`}
                  onClick={() => handleThumbnailClick(video.youtubeId)} // Gère le clic (desktop + mobile)
                  onMouseEnter={() => setHoveredVideo(video.youtubeId)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  onTouchStart={() => setHoveredVideo(video.youtubeId)}
                  onTouchEnd={() => setHoveredVideo(null)}
                  onTouchCancel={() => setHoveredVideo(null)}
                >
                  <div className="absolute inset-0 w-full h-full">
                    {hoveredVideo === video.youtubeId ? (
                      <YouTube
                        videoId={video.youtubeId}
                        opts={{
                          height: '100%',
                          width: '100%', 
                          playerVars: {
                            autoplay: 1,
                            controls: 0,
                            mute: 1,
                            rel: 0,
                            modestbranding: 1,
                            loop: 1,
                            playlist: video.youtubeId,
                          },
                        }}
                        className="w-full h-full pointer-events-none"
                        onReady={(event) => {
                          event.target.playVideo();
                        }}
                      />
                    ) : (
                      <img
                        src={thumbnailSrc}
                        alt={video.title}
                        className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 ${
                          !isVertical ? 'object-center' : 'object-top'
                        }`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                  </div>

                  {/* Badge */}
                  {isShort && (
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-xs font-semibold text-white px-2 py-1 rounded-full shadow-md">
                      Short
                    </span>
                  )}

                  {/* Overlay Texte */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="bg-white/10 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-full text-[8px] text-white font-black uppercase tracking-[0.2em] mb-3 inline-block">
                        {video.category?.[0] || "Production"}
                      </span>
                      <h3 className={`font-black tracking-tighter italic uppercase leading-none text-white text-3xl md:text-4xl`}>
                        {video.title || "Work"}
                      </h3>
                    </div>
                  </div>

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
