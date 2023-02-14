import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from './Pokemon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemons.css';

const Pokemons = ({ pokemons }) => {
    const { isLoading, uuid } = useContext(PokemonContext);

    return (
        <div>
            {isLoading ? (
                <div>
                    <Skeleton variant='rectangular' width={210} height={200} />
                </div>
            ) : (
                <div className='pokemon-container'>
                    {pokemons.map((pokemon) => (
                        <Pokemon key={uuid()} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pokemons;
