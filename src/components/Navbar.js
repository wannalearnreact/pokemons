import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Navbar.css';
import Button from './Button';
import search from '../assets/images/search.png';
import Dropdown from './Dropdown';
const Navbar = () => {
    const { searchedValue, setSearchedValue, filteredPokemons } =
        useContext(PokemonContext);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    useEffect(() => {}, [searchedValue, filteredPokemons]);
    return (
        <nav className='navbar'>
            <Link to='/' className='navbar-brand' />
            <Dropdown />
            <form className='form'>
                <img src={search} alt='' />
                <input
                    type='text'
                    placeholder='Search for pokemon'
                    aria-label='Search'
                    value={searchedValue}
                    onChange={(e) => {
                        setSearchedValue(e.target.value);
                    }}
                />

                <Button text='Search' btnFunction={handleSearch} />
            </form>
        </nav>
    );
};

export default Navbar;
