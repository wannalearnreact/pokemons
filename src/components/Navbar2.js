import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { PokemonContext } from '../context/PokemonProvider';

const Navbar2 = () => {
    const { login, authErrorMessages, profile, user, logout } =
        useContext(AuthContext);
    const navigate = useNavigate();
    /*
    const { user, setUser } = useContext(PokemonContext);
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');

                setUser(null);
            })
            .catch((error) => {
                // An error happened.
            });
    };
 */
    return (
        <nav className='navbar'>
            <p>test</p>
            <p>Home</p>
            {user ? (
                <button className='btn' onClick={logout}>
                    Logout
                </button>
            ) : (
                <button className='btn' onClick={() => navigate('/login')}>
                    Login
                </button>
            )}
        </nav>
    );
};

export default Navbar2;
