import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
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
