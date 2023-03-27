import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navbar";

import "./index.css";
import Error from "./components/Error";
import SinglePokemonPage from "./pages/SinglePokemonPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "./context/AuthProvider";
import Protected from "./components/Protected";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/*   <Route path='/favourites' element={<FavouritesPage />} /> */}
          <Route
            path="/favourites"
            element={
              <Protected user={user}>
                <FavouritesPage />
              </Protected>
            }
          />
          <Route path="/pokemon/:id" element={<SinglePokemonPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
