import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from '../components/Pokemon';

const SearchPage = () => {
    const { globalPokemons, searchedValue } = useContext(PokemonContext);

    useEffect(() => {}, [searchedValue]);
    return (
        <div className='pokemon-container'>
            {searchedValue &&
                globalPokemons
                    .filter((p) => p.name.includes(searchedValue))
                    .map((pokemon) => (
                        <Pokemon key={pokemon.id} pokemon={pokemon} />
                    ))}
        </div>
    );
};

export default SearchPage;
