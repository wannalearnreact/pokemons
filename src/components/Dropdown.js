import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import '../styles/components/Dropdown.css';
import Select from 'react-select';
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
