import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import Button from './Button';
import search from '../assets/images/search.png';
import Dropdown from './Dropdown';
import Filter from '../components/Filter';
import favourites from '../assets/images/favourites.png';
const Navbar = () => {
    const {
        searchedValue,
        setSearchedValue,
        filteredPokemons,
        filterActive,
        sortActive,
        setSortActive,
    } = useContext(PokemonContext);

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
                {/*  <Link
                    to='/favourites'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <img style={{ width: '64px' }} src={favourites} alt='' />
                </Link> */}
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
                <Link
                    to='/favourites'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <img style={{ width: '50px' }} src={favourites} alt='' />
                </Link>
                <form className='form'>
                    <img className='form-img ' src={search} alt='' />
                    <input
                        type='text'
                        placeholder='Find pokemon...'
                        aria-label='Search'
                        value={searchedValue}
                        onChange={(e) => {
                            setSearchedValue(e.target.value);
                        }}
                    />

                    <Button text='Search' btnFunction={handleSearch} />
                    <Filter />
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
