import { useEffect, useContext } from 'react';
import Pokemon from '../components/Pokemon';
import { PokemonContext } from '../context/PokemonProvider';

const SearchPage = () => {
    const {
        globalPokemons,
        searchedValue,
        uuid,
        selectedOption,
        filteredPokemons,
    } = useContext(PokemonContext);

    return (
        <div className='pokemon-container'>
            {globalPokemons
                .filter(
                    (pokemon) =>
                        selectedOption.value === 'all' ||
                        filteredPokemons.includes(pokemon)
                )
                .filter(
                    (pokemon) =>
                        !searchedValue ||
                        pokemon.name.includes(searchedValue.toLowerCase())
                )
                .reduce((acc, pokemon) => {
                    // Check if the current pokemon ID has already been added to the accumulator array
                    const isDuplicate = acc.some((p) => p.id === pokemon.id);

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
