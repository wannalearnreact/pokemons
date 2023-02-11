import { useContext, useState } from 'react';

import { PokemonContext } from './context/PokemonContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import './index.css';
import Error from './components/Error';
import SinglePokemonPage from './pages/SinglePokemonPage';
import SearchPage from './pages/SearchPage';
function App() {
    const { allPokemons } = useContext(PokemonContext);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/search' element={<SearchPage />} />
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
