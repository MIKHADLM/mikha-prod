import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import AllWork from "./pages/AllWork";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/mikha-prod/", element: <Homepage /> },
      {
        path: "/mikha-prod/allwork/",
        element: <AllWork />,
      },
      {
        path: "/mikha-prod/about/",
        element: <About />,
      },
    ],
  },
]);
