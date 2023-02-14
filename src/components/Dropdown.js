import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import '../styles/components/Dropdown.css';
import Select from 'react-select';
const Dropdown = () => {
    const { handleChange, selectedOption, options } =
        useContext(PokemonContext);

    return (
        <div style={{ backgroundColor: 'red', color: 'blue' }}>
            <Select
                onChange={handleChange}
                options={options}
                value={selectedOption}
                /*   defaultValue='all' */
            />
        </div>
    );
};

export default Dropdown;
