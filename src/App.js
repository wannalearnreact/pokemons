import { useContext, useState } from 'react';

import { PokemonContext } from './context/PokemonContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import SearchPage from './pages/SearchPage';

import Navbar from './components/Navbar';

import './index.css';
import Error from './components/Error';
import SinglePokemonPage from './pages/SinglePokemonPage';
function App() {
    const { allPokemons } = useContext(PokemonContext);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/favourites' element={<FavouritesPage />} />
                    <Route
                        path='/pokemon/:id'
                        element={<SinglePokemonPage />}
                    />
                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
