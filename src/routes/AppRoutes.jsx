import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Home from "../pages/Home";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Detail from "../pages/Detail";

export default function AppRoutes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/pokemon/:idPokemon" element={<Detail />} />
          <Route
            path="*"
            element={
              <div>
                <h1>404 - Página no encontrada</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
