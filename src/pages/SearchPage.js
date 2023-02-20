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
                    .reduce((acc, pokemon) => {
                        // Check if the current pokemon ID has already been added to the accumulator array
                        const isDuplicate = acc.some(
                            (p) => p.id === pokemon.id
                        );

                        // If the current pokemon ID has not been added to the accumulator array, add it
                        if (!isDuplicate) {
                            acc.push(pokemon);
                        }

                        return acc;
                    }, [])
                    .map((pokemon) => (
                        <Pokemon key={uuid()} pokemon={pokemon} />
                    ))}
        </div>
    );
};

export default SearchPage;
