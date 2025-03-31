import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { router } from "./router.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6D071A",
    },
  },
});

// Remplacer la ligne suivante pour inclure HashRouter
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <RouterProvider router={router} />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
