import { Routes, Route } from "react-router-dom";
import { Login, Playlist, NotFound, Favorites } from "../../pages";
import { ProtectRoutes } from "../components";
import { Header } from "../../layouts/Header";

function App() {
  return (
    <div className="bg-skin-main min-h-screen text-skin-base">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/playlist"
          element={
            <ProtectRoutes>
              <Header />
              <Playlist />
            </ProtectRoutes>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectRoutes>
              <Header />
              <Favorites />
            </ProtectRoutes>
          }
        />

        <Route
          path="*"
          element={
            <ProtectRoutes>
              <NotFound />
            </ProtectRoutes>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
