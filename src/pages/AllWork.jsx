import React from "react";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Miniature01 from "../assets/thumbnails/01.jpeg";
import Miniature02 from "../assets/thumbnails/02.jpeg";
import Miniature03 from "../assets/thumbnails/03.jpeg";
import Miniature04 from "../assets/thumbnails/04.jpeg";
import Miniature05 from "../assets/thumbnails/05.jpeg";

const AllWork = () => {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <img
              src={Miniature01}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature02}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature03}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature04}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature05}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature01}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature02}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature03}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              src={Miniature04}
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AllWork;
