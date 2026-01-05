import React, { useState, useEffect, useMemo, useRef } from "react";
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
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Toutes les vidéos");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [open, setOpen] = useState(false);
  const [remoteVideos, setRemoteVideos] = useState([]);

  // useRef pour stocker les éléments vidéo préchargés (évite les re-renders)
  const preloadedVideosRef = useRef(new Map());
  const videoElementsRef = useRef(new Set()); // Pour le nettoyage

  // Gestion du cycle de vie avec nettoyage, support multi-format et préchargement intelligent
  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setRemoteVideos(data);

      // Fonction de préchargement avec support multi-format
      const preloadVideo = (video) => {
        if (!video.previewClipUrl || preloadedVideosRef.current.has(video.youtubeId)) {
          return;
        }

        const videoElement = document.createElement('video');
        videoElement.preload = 'auto';
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.playsInline = true;
        videoElement.style.display = 'none';

        // Support multi-format : WebM prioritaire
        const webmUrl = video.previewClipUrl.replace('.mp4', '.webm');
        const mp4Url = video.previewClipUrl;

        if (video.previewClipUrl.includes('.webm')) {
          videoElement.src = video.previewClipUrl;
        } else {
          // Tenter WebM d'abord, fallback MP4
          const sourceWebM = document.createElement('source');
          sourceWebM.src = webmUrl;
          sourceWebM.type = 'video/webm';

          const sourceMP4 = document.createElement('source');
          sourceMP4.src = mp4Url;
          sourceMP4.type = 'video/mp4';

          videoElement.appendChild(sourceWebM);
          videoElement.appendChild(sourceMP4);
        }

        document.body.appendChild(videoElement);

        // Stocker pour nettoyage
        videoElementsRef.current.add(videoElement);
        preloadedVideosRef.current.set(video.youtubeId, videoElement);

        // Forcer le chargement
        videoElement.load();
      };

      // Préchargement intelligent : 6 premiers en priorité, le reste après
      const videosWithPreview = data.filter(v => v.previewClipUrl);
      const priorityVideos = videosWithPreview.slice(0, 6);
      const remainingVideos = videosWithPreview.slice(6);

      // Charger les 6 premiers immédiatement
      priorityVideos.forEach(video => preloadVideo(video));

      // Charger le reste avec requestIdleCallback ou setTimeout
      const loadRemainingVideos = () => {
        remainingVideos.forEach((video, index) => {
          setTimeout(() => preloadVideo(video), index * 200); // Espacer les chargements
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadRemainingVideos);
      } else {
        setTimeout(loadRemainingVideos, 1000);
      }
    };

    fetchVideos();

    // Nettoyage au démontage
    return () => {
      videoElementsRef.current.forEach(element => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      videoElementsRef.current.clear();
      preloadedVideosRef.current.clear();
    };
  }, []);


  const handleVideoHover = (video) => {
    // Sur desktop seulement
    if (window.matchMedia('(hover: hover)').matches) {
      setHoveredVideo(video.youtubeId);
    }
  };

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
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 border ${selectedCategory === cat
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

              const videoGroups = createVideoGroups(sortedVideos);

              return videoGroups.map((group, groupIndex) => (
                <React.Fragment key={`group-${groupIndex}`}>
                  {group.videos.map((video, videoIndex) => {
                    const isVertical = video.orientation === "vertical" || video.category?.includes("Vidéos courtes");
                    const isShort = isVertical;
                    const colSpan = getColSpan(group, videoIndex);

                    const thumbnailSrc =
                      video.thumbnailUrl && video.thumbnailUrl.trim().length > 0
                        ? video.thumbnailUrl
                        : `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

                    return (
                      <div
                        key={video.id}
                        data-video-id={video.youtubeId} // ID pour l'observer
                        className={`video-card relative group bg-black overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 hover:border-white/20 ${colSpan} ${isVertical
                          ? "aspect-[4/5] md:aspect-[9/16]" // Verticale : 4:5 mobile, 9:16 desktop
                          : "aspect-video" // Horizontales : toujours 16:9 pour éviter la déformation
                          }`}
                        onClick={() => handleThumbnailClick(video.youtubeId)} // Gère le clic (desktop + mobile)
                        onMouseEnter={() => handleVideoHover(video)}
                        onMouseLeave={() => setHoveredVideo(null)}
                        onTouchStart={() => setHoveredVideo(video.youtubeId)} // Mobile : Toucher pour voir preview
                        onTouchEnd={() => setHoveredVideo(null)} // Relâcher pour arrêter
                      >
                        <div className="absolute inset-0 w-full h-full">
                          {/* Image de fond (Toujours présente pour éviter l'écran noir) */}
                          <img
                            src={thumbnailSrc}
                            alt={video.title}
                            className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 ${!isVertical ? 'object-center' : 'object-top'
                              }`}
                          />

                          {/* Vidéo en surimpression (Si survolée) */}
                          {hoveredVideo === video.youtubeId && (
                            <>
                              {/* Spinner de chargement (z-10) */}
                              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                              </div>

                              <div className="absolute inset-0 w-full h-full z-20">
                                {video.previewClipUrl ? (
                                  <video
                                    key={video.youtubeId}
                                    ref={(el) => {
                                      if (el && !el.dataset.initialized) {
                                        el.dataset.initialized = 'true';

                                        // Initialement transparent
                                        el.style.opacity = '0';
                                        el.style.transition = 'opacity 0.5s ease-in-out';

                                        // Utiliser l'élément préchargé si disponible
                                        const preloadedElement = preloadedVideosRef.current.get(video.youtubeId);
                                        if (preloadedElement) {
                                          // Cloner les sources
                                          const sources = preloadedElement.querySelectorAll('source');
                                          if (sources.length > 0) {
                                            sources.forEach(source => {
                                              el.appendChild(source.cloneNode(true));
                                            });
                                          } else {
                                            el.src = preloadedElement.src;
                                          }

                                          // Attributs
                                          el.preload = 'auto'; // Important pour mobile
                                          el.muted = true;
                                          el.loop = true;
                                          el.playsInline = true;

                                          // Activer le fade-in quand prêt
                                          el.oncanplay = () => {
                                            el.style.opacity = '1';
                                            el.play().catch(() => { }); // Tentative de lecture
                                          };

                                          el.load();
                                        } else {
                                          // Fallback
                                          const webmUrl = video.previewClipUrl.replace('.mp4', '.webm');
                                          if (video.previewClipUrl.includes('.webm')) {
                                            el.src = video.previewClipUrl;
                                          } else {
                                            const sourceWebM = document.createElement('source');
                                            sourceWebM.src = webmUrl;
                                            sourceWebM.type = 'video/webm';
                                            const sourceMP4 = document.createElement('source');
                                            sourceMP4.src = video.previewClipUrl;
                                            sourceMP4.type = 'video/mp4';
                                            el.appendChild(sourceWebM);
                                            el.appendChild(sourceMP4);
                                          }

                                          // Activer le fade-in quand prêt (même pour fallback)
                                          el.oncanplay = () => {
                                            el.style.opacity = '1';
                                          };
                                        }
                                      }
                                    }}
                                    className="w-full h-full object-cover pointer-events-none"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
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
                                )}
                              </div>
                            </>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-20" />
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
