import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";

//identifiants des videos à afficher, ex : https://www.youtube.com/watch?v=knEyW1NxPbQ l'id est vDrT7jFjC9Y
const videoLinks = [
  "knEyW1NxPbQ",
  "sluhYQHknao",
  "O-W1xYAm1_U",
  "CBdkIpn6DXA",
  "3ymK5lk5GwM",
  "FvXFbHNVub8",
  "6U9_wur4HYI",
  "6D30Fw37Zag",
  "sZkU38eOzSs",
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

  useEffect(() => {
    selectedVideo ? setOpen(true) : setOpen(false);
  }, [selectedVideo]);

  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {videoLinks.map((videoId, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="thumbnail"
                className="object-cover h-full w-full cursor-pointer hover:opacity-25"
                onClick={() => setSelectedVideo(videoId)}
                style={{ cursor: "pointer" }}
              />
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
