import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from './Pokemon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemons.css';
import Loading from './Loading';

const Pokemons = ({ pokemons }) => {
    const { isLoading, uuid, sortActive, motion } = useContext(PokemonContext);

    function sortAndRemoveDuplicates(array) {
        if (sortActive === false) {
            return array
                .sort((a, b) => a.name.localeCompare(b.name))
                .reduce((acc, cur) => {
                    return acc.some((p) => p.id === cur.id)
                        ? acc
                        : [...acc, cur];
                }, []);
        }
        if (sortActive === true) {
            return array
                .sort((b, a) => a.name.localeCompare(b.name))
                .reduce((acc, cur) => {
                    return acc.some((p) => p.id === cur.id)
                        ? acc
                        : [...acc, cur];
                }, []);
        } else {
            return array.reduce((acc, cur) => {
                return acc.some((p) => p.id === cur.id) ? acc : [...acc, cur];
            }, []);
        }
    }

    return (
        <motion.div layout className='pokemon-container'>
            {isLoading
                ? Array.from({ length: 10 }).map((i) => (
                      <Loading key={i} height='300px' />
                  ))
                : sortAndRemoveDuplicates(pokemons).map((item) => (
                      <Pokemon key={uuid()} pokemon={item} />
                  ))}
        </motion.div>
    );
};

export default Pokemons;
