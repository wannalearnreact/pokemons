import { useEffect, useState } from 'react';
import { PokemonContext } from './PokemonContext';
import bug from '../assets/icons/bug.svg';
import dark from '../assets/icons/dark.svg';
import dragon from '../assets/icons/dragon.svg';
import electric from '../assets/icons/electric.svg';
import fairy from '../assets/icons/fairy.svg';
import fighting from '../assets/icons/fighting.svg';
import fire from '../assets/icons/fire.svg';
import flying from '../assets/icons/flying.svg';
import ghost from '../assets/icons/ghost.svg';
import grass from '../assets/icons/grass.svg';
import ground from '../assets/icons/ground.svg';
import ice from '../assets/icons/ice.svg';
import normal from '../assets/icons/normal.svg';
import poison from '../assets/icons/poison.svg';
import psychic from '../assets/icons/psychic.svg';
import rock from '../assets/icons/rock.svg';
import steel from '../assets/icons/steel.svg';
import water from '../assets/icons/water.svg';
import uuid from 'react-uuid';
export const PokemonProvider = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [offset, setOffset] = useState(0);
    const [searchedValue, setSearchedValue] = useState('');

    const url = 'https://pokeapi.co/api/v2/';

    const fetchAllPokemons = async (limit = 10) => {
        try {
            const res = await fetch(
                `${url}pokemon?limit=${limit}&offset=${offset}`
            );
            const data = await res.json();

            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                return data;
            });
            const results = await Promise.all(promises);

            setAllPokemons([...allPokemons, ...results]);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    };
    const fetchGlobalPokemons = async (limit = 10000) => {
        try {
            const res = await fetch(
                `${url}pokemon?limit=${limit}&offset=${offset}`
            );
            const data = await res.json();

            const promises = data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const data = await res.json();
                return data;
            });
            const results = await Promise.all(promises);

            setGlobalPokemons([...globalPokemons, ...results]);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
    };
    const loadMorePokemons = (limit) => {
        setOffset(offset + 5);
    };

    const getPokemonByID = async (id) => {
        const url = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${url}pokemon/${id}`);
        const data = await res.json();

        return data;
    };

    const checkType = (type) => {
        switch (type) {
            case 'bug':
                return bug;
                break;
            case 'dark':
                return dark;
                break;
            case 'dragon':
                return dragon;
                break;
            case 'electric':
                return electric;
                break;
            case 'fairy':
                return fairy;
                break;
            case 'fighting':
                return fighting;
                break;
            case 'fire':
                return fire;
                break;
            case 'flying':
                return flying;
                break;
            case 'ghost':
                return ghost;
                break;
            case 'grass':
                return grass;
                break;
            case 'ground':
                return ground;
                break;
            case 'ice':
                return ice;
                break;
            case 'normal':
                return normal;
                break;
            case 'poison':
                return poison;
                break;
            case 'psychic':
                return psychic;
                break;
            case 'rock':
                return rock;
                break;
            case 'steel':
                return steel;
                break;
            case 'water':
                return water;
                break;
            default:
                return null;
        }
    };

    useEffect(() => {
        fetchAllPokemons();
    }, [offset]);
    useEffect(() => {
        fetchGlobalPokemons();
    }, [offset]);

    // DROPDOWN

    const [selectedOption, setSelectedOption] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const options = [
        { value: 'all', label: 'all' },
        { value: 'grass', label: 'grass' },
        { value: 'normal', label: 'normal' },
        { value: 'fighting', label: 'fighting' },
        { value: 'flying', label: 'flying' },
        { value: 'poison', label: 'poison' },
        { value: 'ground', label: 'ground' },
        { value: 'rock', label: 'rock' },
        { value: 'bug', label: 'bug' },
        { value: 'ghost', label: 'ghost' },
        { value: 'steel', label: 'steel' },
        { value: 'fire', label: 'fire' },
        { value: 'water', label: 'water' },
        { value: 'electric', label: 'electric' },
        { value: 'psychic', label: 'psychic' },
        { value: 'dragon', label: 'dragon' },
        { value: 'dark', label: 'dark' },
        { value: 'fairy', label: 'fairy' },
        { value: 'unknow', label: 'unknown' },
        { value: 'shadow', label: 'shadow' },
    ];
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (selectedOption.value === 'all') {
            setFilteredPokemons(allPokemons);
        } else {
            setFilteredPokemons(
                allPokemons.filter((pokemon) => {
                    return (
                        pokemon.types.filter(
                            (t) => t.type.name === selectedOption.value
                        ).length > 0
                    );
                })
            );
        }
    };

    /*    const handleChange = (option) => {
        setSelectedOption(option);

        if (option.value === 'all') {
            setFilteredPokemons(allPokemons);
        } else {
            setFilteredPokemons(
                allPokemons.filter((pokemon) =>
                    pokemon.types.map((type) => type.type.name === option.value)
                )
            );
        }
    }; */
    return (
        <PokemonContext.Provider
            value={{
                allPokemons,
                getPokemonByID,
                error,
                loadMorePokemons,
                isLoading,
                setIsLoading,
                checkType,
                setSearchedValue,
                searchedValue,
                globalPokemons,
                options,
                selectedOption,
                filteredPokemons,
                handleChange,
                uuid,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
