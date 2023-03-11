import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { AuthContext } from '../context/AuthProvider';
import { PokemonContext } from '../context/PokemonProvider';

const HomePage = () => {
    const {
        allPokemons,
        loadMorePokemons,
        filteredPokemons,
        selectedOption,
        fetchAllPokemons,
        offset,
        setIsLoading,
    } = useContext(PokemonContext);
    const { login, authErrorMessages, profile, user } = useContext(AuthContext);
    useEffect(() => {
        setIsLoading(true);
        fetchAllPokemons();
    }, [offset]);

    useEffect(() => {}, [filteredPokemons]);
    {
        console.log(profile);
    }
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
