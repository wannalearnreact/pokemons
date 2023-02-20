import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { PokemonContext } from '../context/PokemonContext';

const HomePage = () => {
    const { allPokemons, loadMorePokemons, filteredPokemons, selectedOption } =
        useContext(PokemonContext);

    useEffect(() => {}, [filteredPokemons]);

    return (
        <div>
            {selectedOption.value !== 'all' ? (
                <Pokemons pokemons={filteredPokemons} />
            ) : (
                <Pokemons pokemons={allPokemons} />
            )}

            {selectedOption.value === 'all' && (
                <Button
                    text='Load more pokemons'
                    btnFunction={loadMorePokemons}
                />
            )}
        </div>
    );
};

export default HomePage;
