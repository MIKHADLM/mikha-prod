import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6D071A",
    },
  },
});

// Remplacer la ligne suivante pour inclure le `basename` dans le RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} basename="/mikha-prod" /> {/* Ajouter le basename ici */}
    </ThemeProvider>
  </React.StrictMode>
);

