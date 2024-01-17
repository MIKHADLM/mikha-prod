import React from "react";
import NavBar from "../components/NavBar";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const About = () => {
  return (
    <div className="bg-black bg-cover">
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <img
              src="https://ds.static.rtbf.be/article/image/1920x1080/f/a/9/69d658d0b2859e32cd4dc3b970c8496c-1686300001.jpg"
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              src="https://www.nme.com/wp-content/uploads/2023/11/tupac-Shakur-696x442.jpg"
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              src="https://generations.fr/media/news/2pac-est-plus-grand-que-biggie-et-jay-z-selon-melle-mel_64006a2346d0c.webp"
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
          <Grid item xs={3}>
            <img
              src="https://ds.static.rtbf.be/article/image/1920x1080/f/a/9/69d658d0b2859e32cd4dc3b970c8496c-1686300001.jpg"
              alt="thumbnail"
              className="object-cover h-full w-full cursor-pointer"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default About;
