import { useEffect } from 'react';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from '../components/Pokemon';

const SearchPage = () => {
    const { globalPokemons, searchedValue, uuid } = useContext(PokemonContext);

    useEffect(() => {}, [searchedValue]);
    return (
        <div className='pokemon-container'>
            {searchedValue &&
                globalPokemons
                    .filter((p) => p.name.includes(searchedValue))
                    .map((pokemon) => (
                        <Pokemon key={uuid()} pokemon={pokemon} />
                    ))}
        </div>
    );
};

export default SearchPage;
