import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import YouTube from "react-youtube";
import Modal from "@mui/material/Modal";

const AllWork = () => {
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

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {videoLinks.map((videoId, index) => (
            <Grid item xs={4} key={index}>
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="thumbnail"
                className="object-cover h-full w-full cursor-pointer"
                onClick={() => openVideo(videoId)}
                style={{ cursor: "pointer" }}
              />
              <Modal open={selectedVideo !== null} onClose={closeVideo}>
                <div
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    width: "80vw",
                  }}
                >
                  <YouTube videoId={selectedVideo} opts={opts} />
                </div>
              </Modal>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AllWork;
