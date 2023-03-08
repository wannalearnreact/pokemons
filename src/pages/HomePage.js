import { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { PokemonContext } from '../context/PokemonContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';
const HomePage = () => {
    const {
        allPokemons,
        loadMorePokemons,
        filteredPokemons,
        selectedOption,
        fetchAllPokemons,
        offset,
        setIsLoading,
        user,
        setUser,
    } = useContext(PokemonContext);

    useEffect(() => {
        setIsLoading(true);
        fetchAllPokemons();
    }, [offset]);

    useEffect(() => {}, [filteredPokemons]);

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                const uid = firebaseUser.uid;
            } else {
                // User is signed out
            }
        });
    }, [setUser]);

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

            {/*  <div style={{ backgroundColor: 'white', height: '100px' }}>
                {user ? (
                    <div>You are logged in as {user}</div>
                ) : (
                    <div>You are not logged in</div>
                )}
            </div> */}
        </div>
    );
};

export default HomePage;
