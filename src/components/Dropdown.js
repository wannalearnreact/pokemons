import { useContext, useEffect } from 'react';

import '../styles/components/Dropdown.css';
import Select from 'react-select';
import { PokemonContext } from '../context/PokemonProvider';
const Dropdown = () => {
    const { handleChange, selectedOption, options } =
        useContext(PokemonContext);
    useEffect(() => {}, [selectedOption]);
    return (
        <Select
            className='dropdown'
            onChange={handleChange}
            options={options}
            value={selectedOption}
            defaultValue={options[0]}
        />
    );
};

export default Dropdown;
