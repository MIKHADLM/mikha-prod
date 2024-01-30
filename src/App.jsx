import { Outlet } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Mikha Prod - Portfolio";
  }, []);
  return (
    <>
      <nav></nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
