import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";

//identifiants des videos à afficher, ex : https://www.youtube.com/watch?v=knEyW1NxPbQ l'id est knEyW1NxPbQ
const videoLinks = [
  { id: "O0Ys-U2_FEE", date: "2024\nCréation intégrale" },
  { id: "dFraOpFdEy0", date: "2024\nMontage" },
  { id: "ZVE95wJM9is", date: "2024\nCréation intégrale" },
  { id: "rpgbOMxSljk", date: "2024\nCréation intégrale" },
  { id: "86rCW1UEFKA", date: "2024\nRéalisation - Montage" },
  { id: "EOI3If7TVyQ", date: "2024\nInterview - Motion Design - Montage" },
  { id: "gDHglCewJVY", date: "2024\nCréation intégrale" },
  { id: "sluhYQHknao", date: "2023\nCréation intégrale" },
  { id: "O-W1xYAm1_U", date: "2023\nCréation intégrale" },
  { id: "6U9_wur4HYI", date: "2023" },
  { id: "CBdkIpn6DXA", date: "2023\nCréation intégrale" },
  { id: "Z0_4QqZ2Kds", date: "2023\nCréation intégrale" },
  { id: "yg2-kGgDzWc", date: "2023\nCréation intégrale" },
  { id: "x_r44LMz5mM", date: "2022\nCréation intégrale" },
  { id: "lGEnx4fI55Y", date: "2022\nCréation intégrale" },
  { id: "imncgWS0T44", date: "2022\nCréation intégrale" },
  { id: "0LUBZK_XaVo", date: "2022" },
  { id: "FvXFbHNVub8", date: "2021" },
  { id: "6D30Fw37Zag", date: "2020" },
  { id: "sZkU38eOzSs", date: "2020" },
  { id: "rO9bcfW52qM", date: "2020" },
  { id: "pbRF4prArZo", date: "2020" },
];

const AllWork = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [open, setOpen] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  useEffect(() => {
    selectedVideo ? setOpen(true) : setOpen(false);
  }, [selectedVideo]);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <NavBar />
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Grid container spacing={1} style={{ margin: 0, width: '100%' }}>
          {videoLinks.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <div
                className="relative"
                onMouseEnter={() => setHoveredVideo(video)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt="thumbnail"
                  className="object-cover h-full w-full cursor-pointer hover:opacity-25"
                  onClick={() => setSelectedVideo(video.id)}
                  style={{ cursor: "pointer" }}
                />
                {hoveredVideo === video && (
                  <span className="font-semibold absolute bottom-1 left-1 text-white">
                    {video.date.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                )}
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal open={open} onClose={() => setSelectedVideo(null)}>
        <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none scale-[0.5] md:scale-125 lg:scale-150">
          <YouTube videoId={selectedVideo} opts={opts} />
        </Box>
      </Modal>
    </div>
  );
};

export default AllWork;
