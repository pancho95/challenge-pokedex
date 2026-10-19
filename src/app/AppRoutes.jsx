import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import Team from "../pages/Team/Team";
import Compare from "../pages/Compare/Compare";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:idPokemon" element={<Detail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
