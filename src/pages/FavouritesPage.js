import React, { useEffect } from 'react';
import { useContext } from 'react';
import Pokemons from '../components/Pokemons';
import Info from '../components/Info';
import Button from '../components/Button';
import '../styles/pages/FavouritesPage.css';
import { PokemonContext } from '../context/PokemonProvider';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Dropdown from '../components/Dropdown';

const FavouritesPage = () => {
    const {
        favouriteIDs,
        globalPokemons,
        setFavouriteIDs,
        filteredPokemons,
        selectedOption,
        favouritePokemons,
        setFavouritePokemons,
    } = useContext(PokemonContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setFavouritePokemons(
            globalPokemons.filter((pokemon) =>
                favouriteIDs.includes(pokemon.id)
            )
        );
    }, [favouriteIDs, selectedOption]);

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
        <div className='container'>
            {favouritePokemons.length > 0 ? (
                <>
                    <Dropdown />
                    <Info
                        text={`${user.email.split('@')[0]} has ${
                            favouritePokemons.length
                        } favourite ${
                            favouritePokemons.length === 1
                                ? 'pokemon'
                                : 'pokemons'
                        }`}
                    />
                    {selectedOption.value !== 'all' ? (
                        <Pokemons pokemons={filteredPokemons} />
                    ) : (
                        <Pokemons pokemons={favouritePokemons} />
                    )}
                    <Button
                        btnFunction={emptyFavourites}
                        text='Empty Favourites'
                        btnClass='loadmore'
                    />
                </>
            ) : (
                <Info
                    text='There are no favourites...'
                    height='calc(100vh - 80px)'
                />
            )}
        </div>
    );
};

export default FavouritesPage;
