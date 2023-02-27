import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemons from '../components/Pokemons';
import Info from '../components/Info';
import Button from '../components/Button';
const FavouritesPage = () => {
    const { favouriteIDs, globalPokemons, setFavouriteIDs } =
        useContext(PokemonContext);
    const [favouritePokemons, setFavouritePokemons] = useState([]);

    useEffect(() => {
        setFavouritePokemons(
            globalPokemons.filter((pokemon) =>
                favouriteIDs.includes(pokemon.id)
            )
        );
    }, [favouriteIDs]);

    const emptyFavourites = () => {
        setFavouriteIDs([]);
    };
    return (
        <div>
            {favouritePokemons.length > 0 ? (
                <>
                    <Pokemons pokemons={favouritePokemons} />
                    <Button
                        btnFunction={emptyFavourites}
                        text='Empty Favourites'
                    />
                </>
            ) : (
                <Info text='There are no favourites...' />
            )}

            {}
        </div>
    );
};

export default FavouritesPage;
