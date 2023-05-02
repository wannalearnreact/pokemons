import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../styles/components/Navbar.css';

import Button from './Button';
import search from '../assets/images/search.png';
import favourites from '../assets/images/favourites.png';

import { PokemonContext } from '../context/PokemonProvider';
import { useLogout } from '../hooks/useLogout';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { searchedValue, setSearchedValue, filteredPokemons, favouriteIDs } =
        useContext(PokemonContext);
    const { logout } = useLogout();
    const { user } = useContext(AuthContext);

    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > 1000) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/search');
        }
    };

    const handleValueChange = (e) => {
        setSearchedValue(e.target.value);
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {}, [searchedValue, filteredPokemons]);
    return (
        <nav className={` ${scrolled ? 'scrolled' : ''}`}>
            <div className={`navbar container`}>
                <Link to='/' className='navbar-brand' />
                <div className='navbar-wrapper'>
                    <div className='navbar-search'>
                        <img
                            className='wrapper-img '
                            src={search}
                            alt='search'
                        />
                        <input
                            type='text'
                            placeholder='Search...'
                            aria-label='Search'
                            value={searchedValue}
                            onChange={handleValueChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='wrapper-buttons'>
                        {user && (
                            <Link
                                to='/favourites'
                                className='wrapper-favourites'
                            >
                                <img src={favourites} alt='favourites' />
                                {favouriteIDs.length > 0 && (
                                    <p className='favourites-count'>
                                        {favouriteIDs.length}
                                    </p>
                                )}
                            </Link>
                        )}
                        {user ? (
                            <Button
                                text='Logout'
                                btnFunction={logout}
                                btnClass='navbar'
                            />
                        ) : (
                            <Button
                                text='Login'
                                btnFunction={navigateToLogin}
                                btnClass='navbar'
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
