import { useContext } from 'react';
import Pokemon from './Pokemon';

import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemons.css';
import Loading from './Loading';
import { PokemonContext } from '../context/PokemonProvider';

const Pokemons = ({ pokemons }) => {
    const { isLoading, uuid, sortActive } = useContext(PokemonContext);

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
        <div className='pokemon-container'>
            {isLoading
                ? Array.from({ length: 10 }).map((i) => (
                      <Loading key={uuid()} height='300px' />
                  ))
                : sortAndRemoveDuplicates(pokemons).map((item) => (
                      <Pokemon key={uuid()} pokemon={item} />
                  ))}
        </div>
    );
};

export default Pokemons;
