import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import '../styles/components/Dropdown.css';
import Select from 'react-select';
const Dropdown = () => {
    const { handleChange, selectedOption, options } =
        useContext(PokemonContext);
    useEffect(() => {}, [selectedOption]);
    return (
        <div style={{ backgroundColor: 'red', color: 'blue', width: '200px' }}>
            <Select
                onChange={handleChange}
                options={options}
                value={selectedOption}
                defaultValue={options[0]}
            />
        </div>
    );
};

export default Dropdown;
