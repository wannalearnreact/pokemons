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

import { motion, AnimatePresence } from 'framer-motion';
export const PokemonProvider = ({ children }) => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [offset, setOffset] = useState(0);
    const [searchedValue, setSearchedValue] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [sortActive, setSortActive] = useState(null);

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

            /* setAllPokemons([...allPokemons, ...results]); */
            setAllPokemons((allPokemons) => [...allPokemons, ...results]);
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
        setIsLoading(false);
        console.log('prvi');
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
        console.log('drugi');
    };
    const loadMorePokemons = (limit) => {
        setOffset(offset + 10);
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
            case 'dark':
                return dark;
            case 'dragon':
                return dragon;
            case 'electric':
                return electric;
            case 'fairy':
                return fairy;
            case 'fighting':
                return fighting;
            case 'fire':
                return fire;
            case 'flying':
                return flying;
            case 'ghost':
                return ghost;
            case 'grass':
                return grass;
            case 'ground':
                return ground;
            case 'ice':
                return ice;
            case 'normal':
                return normal;
            case 'poison':
                return poison;
            case 'psychic':
                return psychic;
            case 'rock':
                return rock;
            case 'steel':
                return steel;
            case 'water':
                return water;
            default:
                return null;
        }
    };

    /*  useEffect(() => {
        fetchAllPokemons();
    }, [offset]); */

    useEffect(() => {
        fetchGlobalPokemons();
    }, []);

    /*   useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchAllPokemons(), fetchGlobalPokemons()]).finally(() =>
            setIsLoading(false)
        );
    }, [offset]); */
    // DROPDOWN

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
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

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
                setSelectedOption,
                setFilterActive,
                filterActive,
                setSortActive,
                sortActive,
                motion,
                fetchGlobalPokemons,
                fetchAllPokemons,
                offset,
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
};
