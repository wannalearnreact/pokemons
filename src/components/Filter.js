import React, { useContext, useState } from 'react';
import filter from '../assets/icons/filter.svg';
import { PokemonContext } from '../context/PokemonProvider';

import '../styles/components/Filter.css';
const Filter = () => {
    const { setFilterActive, filterActive } = useContext(PokemonContext);
    return (
        <div className='filter' onClick={() => setFilterActive(!filterActive)}>
            <img className='filter-img' src={filter} alt='filter' />
        </div>
    );
};

export default Filter;
