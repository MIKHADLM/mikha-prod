import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AllWork from "./pages/AllWork";
import About from "./pages/About";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/allwork" element={<AllWork />} />
        <Route path="/apropos" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
