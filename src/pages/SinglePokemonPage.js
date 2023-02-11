import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/pages/SinglePokemon.css';
import '../styles/colors.css';
import PokemonStats from '../components/PokemonStats';
import PokemonTypes from '../components/PokemonTypes';
const SinglePokemonPage = () => {
    const { getPokemonByID, setIsLoading, isLoading, checkType } =
        useContext(PokemonContext);
    const [singlePokemon, setSinglePokemon] = useState({});
    const { id } = useParams();

    const getSinglePokemon = async (id) => {
        const result = await getPokemonByID(id);
        setSinglePokemon(result);
        setIsLoading(false);
    };

    useEffect(() => {
        getSinglePokemon(id);
    }, [id]);

    return (
        <>
            {isLoading ? (
                <Skeleton variant='rectangular' width={210} height={118} />
            ) : (
                <div
                    key={singlePokemon.id}
                    className={`main bg-${singlePokemon.types?.[0].type.name}`}
                >
                    <div
                        className={`pokemon-main bg-${singlePokemon.types?.[0].type.name}`}
                    >
                        <div className='pokemon-info'>
                            <div>#{singlePokemon.id}</div>
                            <div>{singlePokemon.name}</div>

                            <PokemonTypes pokemon={singlePokemon} />

                            <div className='pokemon-description'>
                                <div>
                                    <span>Height</span>
                                    <div>{singlePokemon.height / 10} m</div>
                                </div>
                                <div>
                                    <span>Weight</span>
                                    <div>{singlePokemon.weight / 10} kg</div>
                                </div>
                                <div>
                                    <span>Abilites</span>
                                    {singlePokemon.abilities?.map((ability) => (
                                        <div key={singlePokemon.id}>
                                            {ability.ability?.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='img-container'>
                            <img
                                className='pokemon-img'
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${singlePokemon.id}.svg`}
                                alt={`Pokemon ${singlePokemon?.name}`}
                            />
                        </div>
                    </div>

                    <PokemonStats singlePokemon={singlePokemon} />
                </div>
            )}
        </>
    );
};

export default SinglePokemonPage;
