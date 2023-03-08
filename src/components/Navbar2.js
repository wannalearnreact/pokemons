import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

const Navbar2 = () => {
    const navigate = useNavigate();
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

    return (
        <nav className='navbar'>
            <p>Home</p>
            {user ? (
                <button className='btn' onClick={handleLogout}>
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
