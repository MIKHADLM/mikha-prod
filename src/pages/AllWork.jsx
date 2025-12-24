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

  // Fonction pour créer des groupes de vidéos optimisés pour l'affichage
  const createVideoGroups = (videos) => {
    const groups = [];
    let i = 0;
    
    while (i < videos.length) {
      const currentVideo = videos[i];
      const currentIsVertical = currentVideo.orientation === "vertical" || currentVideo.category?.includes("Vidéos courtes");
      
      // Vérifier si on peut former un groupe avec les vidéos suivantes
      if (i < videos.length - 1) {
        const nextVideo = videos[i + 1];
        const nextIsVertical = nextVideo.orientation === "vertical" || nextVideo.category?.includes("Vidéos courtes");
        
        // Cas H+V ou V+H : formats différents qui peuvent partager une ligne
        if (currentIsVertical !== nextIsVertical) {
          groups.push({
            type: 'pair',
            videos: [currentVideo, nextVideo],
            layout: currentIsVertical ? 'V+H' : 'H+V'
          });
          i += 2; // Sauter les deux vidéos
          continue;
        }
        
        // Cas H+H : deux horizontales consécutives
        if (!currentIsVertical && !nextIsVertical) {
          groups.push({
            type: 'pair',
            videos: [currentVideo, nextVideo],
            layout: 'H+H'
          });
          i += 2; // Sauter les deux vidéos
          continue;
        }
      }
      
      // Vérifier si on peut avoir 4 vidéos verticales consécutives
      if (currentIsVertical && i <= videos.length - 4) {
        const v1 = videos[i + 1];
        const v2 = videos[i + 2];
        const v3 = videos[i + 3];
        
        const v1IsVertical = v1.orientation === "vertical" || v1.category?.includes("Vidéos courtes");
        const v2IsVertical = v2.orientation === "vertical" || v2.category?.includes("Vidéos courtes");
        const v3IsVertical = v3.orientation === "vertical" || v3.category?.includes("Vidéos courtes");
        
        if (v1IsVertical && v2IsVertical && v3IsVertical) {
          groups.push({
            type: 'quad',
            videos: [currentVideo, v1, v2, v3],
            layout: 'V+V+V+V'
          });
          i += 4; // Sauter les quatre vidéos
          continue;
        }
      }
      
      // Cas par défaut : vidéo seule
      groups.push({
        type: 'single',
        videos: [currentVideo],
        layout: currentIsVertical ? 'V' : 'H'
      });
      i++;
    }
    
    return groups;
  };

  // Fonction pour déterminer le col-span selon le type de groupe et la position
  const getColSpan = (group, videoIndex) => {
    if (group.type === 'pair') {
      // Pour les paires H+V, V+H ou H+H
      if (group.layout === 'H+V') {
        return videoIndex === 0 ? 'md:col-span-3' : 'md:col-span-1';
      } else if (group.layout === 'V+H') {
        return videoIndex === 0 ? 'md:col-span-1' : 'md:col-span-3';
      } else if (group.layout === 'H+H') {
        // Deux horizontales : 2+2 colonnes
        return 'md:col-span-2';
      }
    } else if (group.type === 'quad') {
      // Pour 4 verticales : 1+1+1+1 colonnes
      return 'md:col-span-1';
    } else {
      // Pour les vidéos seules
      if (group.layout === 'V') {
        return 'md:col-span-1';
      } else {
        // Pour les horizontales seules, utiliser la logique existante
        const positionInSequence = videoIndex % 3;
        if (positionInSequence === 0) return 'md:col-span-2';
        if (positionInSequence === 1) return 'md:col-span-2';
        return 'md:col-span-2';
      }
    }
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
              // Trier par ordre croissant et créer les groupes
              const sortedVideos = [...filteredVideos].sort((a, b) => (a.order || 0) - (b.order || 0));
              console.log("Ordre AllWork:", sortedVideos.map(v => ({ title: v.title, order: v.order })));
              
              const videoGroups = createVideoGroups(sortedVideos);
              console.log("Video groups:", videoGroups.map(g => ({ type: g.type, layout: g.layout, videos: g.videos.length })));
              
              return videoGroups.map((group, groupIndex) => (
                <React.Fragment key={`group-${groupIndex}`}>
                  {group.videos.map((video, videoIndex) => {
                    const isVertical = video.orientation === "vertical" || video.category?.includes("Vidéos courtes");
                    const isShort = isVertical;
                    const colSpan = getColSpan(group, videoIndex);

                    console.log(`Video ${video.title}: isVertical=${isVertical}, colSpan=${colSpan}, group=${group.layout}`);

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
                            : "aspect-video" // Horizontales : toujours 16:9 pour éviter la déformation
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
                            video.previewClipUrl ? (
                              <video
                                src={video.previewClipUrl}
                                className="w-full h-full object-cover pointer-events-none"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              />
                            ) : (
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
                            )
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
                </React.Fragment>
              ));
            })()}
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
