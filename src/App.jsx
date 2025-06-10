import "./App.scss";
import Home from "./pages/home/Home.jsx";
import Login from "./components/connection/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout.jsx";
import Register from "./components/connection/Register.jsx";
import { AuthProvider } from "./config/AuthContext.jsx";
import Profil from "./pages/profil/Profil.jsx";
import WebSocketComponent from "./pages/message/WebSocketComponent.jsx";
import FilDesProfils from "./pages/profil/FilDesProfils.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <ChildComponent /> */}
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/ttm/me/profil" element={<Profil />} />
            <Route path="/ttm/me/filProfils" element={<FilDesProfils />} />
            <Route path="/ttm/me/messagerie" element={<WebSocketComponent />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
