import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FavouritesPage from './pages/FavouritesPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';

import './index.css';
import Error from './components/Error';
import SinglePokemonPage from './pages/SinglePokemonPage';
import Login from './pages/Login';
import Protected from './components/Protected';
import Signup from './pages/Signup';
import Info from './components/Info';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
    const { user, authIsReady } = useAuthContext();
    return (
        <div className='App'>
            {authIsReady && (
                <BrowserRouter>
                    <Navbar />

                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/search' element={<SearchPage />} />
                        {/*   <Route path='/favourites' element={<FavouritesPage />} /> */}
                        <Route
                            path='/favourites'
                            element={
                                <Protected user={user}>
                                    <FavouritesPage />
                                </Protected>
                            }
                        />
                        <Route
                            path='/login'
                            element={
                                <Protected user={!user}>
                                    <Login />
                                </Protected>
                            }
                        />
                        <Route
                            path='/signup'
                            element={
                                <Protected user={!user}>
                                    <Signup />
                                </Protected>
                            }
                        />
                        <Route
                            path='/pokemon/:id'
                            element={<SinglePokemonPage />}
                        />

                        <Route
                            path='*'
                            element={
                                <Info
                                    text='Non existing route!'
                                    height={` calc(-80px + 100vh) `}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}

export default App;
