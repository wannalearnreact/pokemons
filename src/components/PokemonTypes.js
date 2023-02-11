import React, { useEffect } from 'react';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import '../styles/components/PokemonTypes.css';
const PokemonTypes = ({ pokemon, justify }) => {
    const { checkType } = useContext(PokemonContext);

    return (
        <div className={`types-svg ${justify}`}>
            {pokemon.types?.map((type) => (
                <div key={pokemon.id} className={`icon ${type.type.name} }`}>
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
