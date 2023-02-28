import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import PokemonTypes from './PokemonTypes';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemon.css';
import '../styles/colors.css';
import addFavourite from '../assets/icons/bookmark-add.svg';
import removeFavourite from '../assets/icons/bookmark-remove.svg';

const Pokemon = ({ pokemon }) => {
    const { motion, favouriteIDs, setFavouriteIDs } =
        useContext(PokemonContext);

    const isFavourite = favouriteIDs.includes(pokemon.id);

    const handlePokemonClick = (id) => {
        if (isFavourite) {
            setFavouriteIDs(favouriteIDs.filter((favId) => favId !== id));
        } else {
            setFavouriteIDs([...favouriteIDs, id]);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={pokemon.id >= 650 ? 'remove' : ' pokemon'}
        >
            <div>
                <img
                    onClick={() => handlePokemonClick(pokemon.id)}
                    className='pokemon-favourite'
                    style={{ width: '64px', height: '64px' }}
                    src={isFavourite ? removeFavourite : addFavourite}
                />
            </div>

            <Link to={`/pokemon/${pokemon.id}`}>
                <img
                    className='pokemon-image'
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={`Pokemon ${pokemon?.name}`}
                />
                <h1
                    className={`pokemon-header color-${pokemon.types?.[0].type.name}`}
                >
                    {pokemon.name}
                </h1>
                <PokemonTypes pokemon={pokemon} justify='justify' />
            </Link>
        </motion.div>
    );
};

export default Pokemon;
