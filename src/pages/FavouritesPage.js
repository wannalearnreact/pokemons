import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Pokemons from '../components/Pokemons';
import Info from '../components/Info';
import Button from '../components/Button';
import '../styles/pages/FavouritesPage.css';
import { PokemonContext } from '../context/PokemonProvider';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
const FavouritesPage = () => {
    const { favouriteIDs, globalPokemons, setFavouriteIDs } =
        useContext(PokemonContext);
    const { user, dispatch } = useContext(AuthContext);
    const [favouritePokemons, setFavouritePokemons] = useState([]);

    useEffect(() => {
        setFavouritePokemons(
            globalPokemons.filter((pokemon) =>
                favouriteIDs.includes(pokemon.id)
            )
        );
    }, [favouriteIDs]);

    useEffect(() => {
        const fetchFavouriteIDs = async () => {
            if (user && user.uid) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setFavouriteIDs(userDocSnap.data().IDs);
                }
            }
        };
        fetchFavouriteIDs();
    }, [user, setFavouriteIDs]);

    const emptyFavourites = async () => {
        setFavouriteIDs([]);
        if (user) {
            const ref = doc(db, 'users', user.uid);
            await updateDoc(ref, {
                IDs: [],
            });
        }
    };
    return (
        <div>
            {favouritePokemons.length > 0 ? (
                <>
                    <Info
                        text={`${user.email.split('@')[0]} has ${
                            favouritePokemons.length
                        } favourite ${
                            favouritePokemons.length === 1
                                ? 'pokemon'
                                : 'pokemons'
                        }`}
                        fontSize='2rem'
                    />
                    <Pokemons pokemons={favouritePokemons} />
                    <Button
                        btnFunction={emptyFavourites}
                        text='Empty Favourites'
                    />
                </>
            ) : (
                <Info
                    text='There are no favourites...'
                    height='calc(100vh - 80px)'
                    fontSize='5rem'
                />
            )}

            {}
        </div>
    );
};

export default FavouritesPage;
