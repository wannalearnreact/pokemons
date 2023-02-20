import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import Pokemon from './Pokemon';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/components/Pokemons.css';
import Loading from './Loading';

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
        <>
            <div className='pokemon-container'>
                {sortAndRemoveDuplicates(pokemons).map((item) => (
                    <Pokemon key={uuid()} pokemon={item} />
                ))}
            </div>
        </>
    );
};

export default Pokemons;

/*

 <div>
            {isLoading ? (
                <div>
                   <Skeleton variant='rectangular' width={210} height={200} /> }
                    <Loading />
                </div>

                 
            ) : (
                <div className='pokemon-container'>
                    {sortAndRemoveDuplicates(pokemons).map((item) => (
                        <Pokemon key={uuid()} pokemon={item} />
                    ))}
                </div>
            )}
        </div>

    */
