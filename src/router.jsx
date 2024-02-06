import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import AllWork from "./pages/AllWork";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        path: "/allwork/",
        element: <AllWork />,
      },
      {
        path: "/about/",
        element: <About />,
      },
    ],
  },
]);
