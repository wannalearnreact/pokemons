import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { PokemonContext } from '../context/PokemonContext';

const HomePage = () => {
    const { allPokemons, loadMorePokemons, filteredPokemons, newArray } =
        useContext(PokemonContext);
    {
        console.log(filteredPokemons);
    }

    /*
   
    this is the reason dropdown isnt working, this needs fixing, the reason 
    that always the same thing is console logged in filteredPokemons is
    cuz of the code under, it will always be filteredPokemons,
    even if the value is "all",
    i know that i need to change the function handleChange in PokemonProvider, but i dont know how...
   */
    return (
        <div>
            {filteredPokemons ? (
                <Pokemons pokemons={filteredPokemons} />
            ) : (
                <Pokemons pokemons={allPokemons} />
            )}

            <Button text='Load more pokemons' btnFunction={loadMorePokemons} />
        </div>
    );
};

export default HomePage;
