import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import Button from './Button';
import search from '../assets/images/search.png';
import Dropdown from './Dropdown';
import Filter from '../components/Filter';

const Navbar = () => {
    const {
        searchedValue,
        setSearchedValue,
        filteredPokemons,
        filterActive,
        sortActive,
        setSortActive,
    } = useContext(PokemonContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    useEffect(() => {}, [searchedValue, filteredPokemons]);
    return (
        <nav className='navbar'>
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
