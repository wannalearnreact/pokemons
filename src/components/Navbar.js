import { useContext, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import Button from './Button';
import search from '../assets/images/search.png';
import Dropdown from './Dropdown';
import Filter from '../components/Filter';
import favourites from '../assets/images/favourites.png';
import { PokemonContext } from '../context/PokemonProvider';
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
    const {
        searchedValue,
        setSearchedValue,
        filteredPokemons,
        filterActive,
        sortActive,
        setSortActive,
        favouriteIDs,
    } = useContext(PokemonContext);
    const location = useLocation();
    const { login, authErrorMessages, profile, user, logout } =
        useContext(AuthContext);

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

    const handleSearch = (e) => {
        if (!location.pathname.includes('search')) {
            navigate('/search');
        }
    };
    const handleChange = (e) => {
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
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div style={{ display: 'flex' }}>
                <Link to='/' className='navbar-brand' />
                {filterActive && (
                    <div className='sort-container'>
                        <Dropdown />
                        <div
                            onClick={() => setSortActive(!sortActive)}
                            className='alphabet-sort'
                        ></div>
                    </div>
                )}
            </div>
            <div className='navbar-sort'>
                {user && (
                    <Link to='/favourites' className='navbar-favourites'>
                        <img src={favourites} alt='favourites' />
                        {favouriteIDs.length > 0 && (
                            <p className='navbar-favourites-count'>
                                {favouriteIDs.length}
                            </p>
                        )}
                    </Link>
                )}

                <div className='navbar-search'>
                    <img className='navbar-img ' src={search} alt='' />
                </div>
                <input
                    type='text'
                    placeholder='Find pokemon...'
                    aria-label='Search'
                    value={searchedValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <Filter />
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
        </nav>
    );
};

export default Navbar;
