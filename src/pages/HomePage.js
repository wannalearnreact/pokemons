import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { PokemonContext } from '../context/PokemonProvider';

//firebase
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
const HomePage = () => {
    const {
        allPokemons,
        loadMorePokemons,
        filteredPokemons,
        selectedOption,
        fetchAllPokemons,
        offset,
        setIsLoading,
        setFavouriteIDs,
    } = useContext(PokemonContext);

    const { user, dispatch } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        fetchAllPokemons();
    }, [offset]);

    useEffect(() => {}, [filteredPokemons]);

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
    }, []);

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
        </div>
    );
};

export default HomePage;
