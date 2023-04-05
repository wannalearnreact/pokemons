import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonTypes from './PokemonTypes';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemon.css';
import '../styles/colors.css';
import addFavourite from '../assets/icons/bookmark-add.svg';
import removeFavourite from '../assets/icons/bookmark-remove.svg';
import { PokemonContext } from '../context/PokemonProvider';
import { db, auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const Pokemon = ({ pokemon }) => {
    const { motion, favouriteIDs, setFavouriteIDs } =
        useContext(PokemonContext);
    const { user, dispatch } = useContext(AuthContext);

    const [isShown, setIsShown] = useState(false);

    const isFavourite = favouriteIDs.includes(pokemon.id);

    const handlePokemonClick = async (id) => {
        if (isFavourite) {
            setFavouriteIDs(favouriteIDs.filter((favId) => favId !== id));
            await removeFromFirebaseFavourites(id);
        } else {
            setFavouriteIDs([...favouriteIDs, id]);
            await addToFirebaseFavourites(id);
        }
    };

    const addToFirebaseFavourites = async (id) => {
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                IDs: arrayUnion(id),
            });
        }
    };

    const removeFromFirebaseFavourites = async (id) => {
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                IDs: arrayRemove(id),
            });
        }
    };

    return (
        <motion.div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            whileHover={{ scale: 1.05 }}
            className={pokemon.id >= 650 ? 'pokemon-hidden ' : ' pokemon'}
        >
            {isShown && (
                <div style={{ position: 'relative' }}>
                    <img
                        onClick={() => handlePokemonClick(pokemon.id)}
                        className={`${isShown ? 'pokemon-favourite' : ''}`}
                        style={{ width: '64px', height: '64px' }}
                        src={isFavourite ? removeFavourite : addFavourite}
                    />
                </div>
            )}

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
