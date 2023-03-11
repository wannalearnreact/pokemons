import React, { useContext } from 'react';
import { useEffect } from 'react';
import { PokemonContext } from '../context/PokemonProvider';

import '../styles/components/PokemonStats.css';
const PokemonStats = ({ singlePokemon }) => {
    const { uuid } = useContext(PokemonContext);
    useEffect(() => {}, [singlePokemon]);
    return (
        <div className={`footer bg-${singlePokemon.types?.[0].type.name}`}>
            <div>Stats</div>
            <div className='stats'>
                {singlePokemon.stats?.map((stat) => {
                    return (
                        <div key={uuid()} className='stats-row'>
                            <div>{stat.stat.name}</div>
                            <div>{stat.base_stat}</div>
                            <div
                                style={{
                                    width: `${stat.base_stat + 50}px`,
                                }}
                            >
                                <div
                                    className={`stats-bar bg-${singlePokemon.types?.[0].type.name}`}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PokemonStats;
