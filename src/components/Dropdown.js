import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/components/Dropdown.css';
import Select from 'react-select';
import { PokemonContext } from '../context/PokemonProvider';

const Dropdown = () => {
    const {
        selectedOption,
        options,
        setSelectedOption,
        setFilteredPokemons,
        globalPokemons,
        allPokemons,
        sortActive,
        setSortActive,
        favouritePokemons,
    } = useContext(PokemonContext);
    const location = useLocation();
    const [defaultOption, setDefaultOption] = useState(options[0]); // default option state

    const handleTypeChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (selectedOption.value === 'all') {
            setFilteredPokemons(globalPokemons);
        } else if (location.pathname === '/search') {
            setFilteredPokemons(
                globalPokemons.filter((pokemon) => {
                    return (
                        pokemon.types.filter(
                            (t) => t.type.name === selectedOption.value
                        ).length > 0
                    );
                })
            );
        } else if (location.pathname === '/') {
            setFilteredPokemons(
                allPokemons.filter((pokemon) => {
                    return (
                        pokemon.types.filter(
                            (t) => t.type.name === selectedOption.value
                        ).length > 0
                    );
                })
            );
        } else if (location.pathname === '/favourites') {
            setFilteredPokemons(
                favouritePokemons.filter((pokemon) => {
                    return (
                        pokemon.types.filter(
                            (t) => t.type.name === selectedOption.value
                        ).length > 0
                    );
                })
            );
        }
    };

    useEffect(() => {
        // reset selectedOption to default when location changes to home route
        if (location.pathname === '/') {
            setSelectedOption(defaultOption);
        }
    }, [location, defaultOption, setSelectedOption]);

    return (
        <div className='dropdown-container'>
            <Select
                className='dropdown'
                onChange={handleTypeChange}
                options={options}
                value={selectedOption}
                defaultValue={defaultOption}
            />
            <div
                onClick={() => setSortActive(!sortActive)}
                className='dropdown-sort'
            ></div>
        </div>
    );
};

export default Dropdown;
