import React, { useEffect, useState } from 'react';
import { useContext } from 'react';

import Pokemons from '../components/Pokemons';
import Info from '../components/Info';
import Button from '../components/Button';
import '../styles/pages/FavouritesPage.css';
import { PokemonContext } from '../context/PokemonProvider';
import { AuthContext } from '../context/AuthProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseContext } from '../context/FirebaseProvider';
const FavouritesPage = () => {
    const { favouriteIDs, globalPokemons, setFavouriteIDs } =
        useContext(PokemonContext);
    const { login, authErrorMessages, profile, user, logout } =
        useContext(AuthContext);
    const { myAuth, myFS } = useContext(FirebaseContext);
    const [favouritePokemons, setFavouritePokemons] = useState([]);

    useEffect(() => {
        setFavouritePokemons(
            globalPokemons.filter((pokemon) =>
                favouriteIDs.includes(pokemon.id)
            )
        );
    }, [favouriteIDs, user]);

    const emptyFavourites = async () => {
        setFavouriteIDs([]);
        if (user) {
            const ref = doc(myFS, 'users', user.uid);
            await updateDoc(ref, {
                IDs: [],
            });
        }
    };

    {
        console.log('favouritePokemons', favouritePokemons);
    }
    return (
        <div>
            {favouritePokemons.length > 0 ? (
                <>
                    <h1>
                        You have {favouritePokemons.length} favourite Pokemons
                    </h1>
                    <Info
                        text={`You have ${favouritePokemons.length} favourite ${
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
