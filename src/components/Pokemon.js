import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemon.css';
import '../styles/colors.css';
import PokemonTypes from './PokemonTypes';

/* import placeholder from '../assets/icons/placeholder.svg'; */
const Pokemon = ({ pokemon }) => {
    const { isLoading } = useContext(PokemonContext);
    const navigate = useNavigate();

    return (
        <div className={pokemon.id >= 650 ? 'remove' : ' pokemon'}>
            {isLoading ? (
                <>
                    <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={210}
                        height={118}
                    />
                </>
            ) : (
                <Link to={`/pokemon/${pokemon.id}`}>
                    <img
                        className='pokemon-image'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={`Pokemon ${pokemon?.name}`}
                    />
                    <h1
                        className={`pokemon-header color-${pokemon.types?.[0].type.name}`}
                        /* className={`bg-${pokemon.types?.[0].type.name}`} */
                    >
                        {pokemon.name}
                    </h1>
                    <PokemonTypes pokemon={pokemon} justify='justify' />
                </Link>
            )}
        </div>
    );
};

export default Pokemon;
