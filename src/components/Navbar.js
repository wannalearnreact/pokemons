import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
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
    } = useContext(PokemonContext);
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

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
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
                    <Link
                        to='/favourites'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            style={{ width: '50px' }}
                            src={favourites}
                            alt=''
                        />
                    </Link>
                )}

                <form className='navbar-search'>
                    <img className='navbar-img ' src={search} alt='' />
                    <input
                        type='text'
                        placeholder='Find pokemon...'
                        aria-label='Search'
                        value={searchedValue}
                        onChange={(e) => {
                            setSearchedValue(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />

                    <div>
                        <Button
                            text='Search'
                            btnFunction={handleSearch}
                            btnClass=''
                        />
                    </div>
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
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
