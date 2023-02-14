import { useContext, useEffect } from 'react';
import Button from '../components/Button';
import Pokemons from '../components/Pokemons';
import { PokemonContext } from '../context/PokemonContext';

const HomePage = () => {
    const { allPokemons, loadMorePokemons, filteredPokemons, selectedOption } =
        useContext(PokemonContext);
    {
        console.log(filteredPokemons);
    }

    return (
        <div>
            {/* if i use this way it works on first render, but when i press a button " load more pokemons", new pokemons get added to allPokemons array and because of the statement under new pokemons will never be shown because filteredPokemons.length will always be greater than 0 and it will display only filteredPokemons, which doesnt have newly added pokemons we got by pressing the button load more */}

            {/*   {filteredPokemons.length > 0 ? (
                <Pokemons pokemons={filteredPokemons} />
            ) : (
                <Pokemons pokemons={allPokemons} />
            )} */}

            {/* If i use this way then when i first load the page nothing is displayed because of the written statement selectedOPtion.value!=="all", if a value is different than "all" then it will display filteredPokemons, which is empty at first , if any other value is chosen(grass, poison) it will work, if you pick "all" on the dropdown it will work, but i cant set "all"  as a default menu, i tried putting it in Dropdown component as default="all" didnt work, i tried putting in PokemonProvider selectedOption state as "all* aswell, didnt work, dont know what else there is to do ? */}
            <div>
                {selectedOption.value !== 'all' ? (
                    <Pokemons pokemons={filteredPokemons} />
                ) : (
                    <Pokemons pokemons={allPokemons} />
                )}
            </div>

            <Button text='Load more pokemons' btnFunction={loadMorePokemons} />
        </div>
    );
};

export default HomePage;
