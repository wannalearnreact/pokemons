import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';

import './index.css';
import Error from './components/Error';
import SinglePokemonPage from './pages/SinglePokemonPage';
import Navbar2 from './components/Navbar2';
import { useState } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Navbar2
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/favourites' element={<FavouritesPage />} />
                    <Route
                        path='/pokemon/:id'
                        element={<SinglePokemonPage />}
                    />

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
