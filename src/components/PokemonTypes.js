import React, { useEffect } from 'react';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonProvider';

import '../styles/components/PokemonTypes.css';
const PokemonTypes = ({ pokemon, justify }) => {
    const { checkType, uuid } = useContext(PokemonContext);

    return (
        <div className={`types-svg ${justify}`}>
            {pokemon.types?.map((type) => (
                <div key={uuid()} className={`icon ${type.type.name} }`}>
                    <div className={`type ${type.type.name}`}>
                        {type.type.name}
                    </div>
                    <img
                        src={type.type.name ? checkType(type.type.name) : ''}
                        alt='aaa'
                    />
                </div>
            ))}
        </div>
    );
};

export default PokemonTypes;
