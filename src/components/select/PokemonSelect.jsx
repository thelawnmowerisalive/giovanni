import { useContext, useEffect, useState } from "react";
import LanguageContext from "../../LanguageContext";
import Pokedex from "../../model/Pokedex";
import PokemonStorage from "../../PokemonStorage";

/**
 * Allows Pokemon selection by name (searching in the dex), 
 * from a predefined list, or from local storage.
 */
export default function PokemonSelect({ id, label, value, onChange, list }) {
    const language = useContext(LanguageContext);
    const [searchMode, setSearchMode] = useState(false);

    const createOptions = (keys => keys.map(key => (
        <option key={key} value={key}>
            {Pokedex.INSTANCE.pokemon[key].names[language]}
        </option>
    )));

    /**
     * Create options from the pre-defined list, or from the index
     * in local storage (if there are more than 3 Pokemon saved).
     */
    const [options, setOptions] = useState(() => {
        if (list) {
            return createOptions(list);
        } else if (!searchMode) {
            const index = PokemonStorage.index;
            if (index.length > 3) {
                return createOptions(index);
            }
        }
    });

    const switchMode = () => {
        if (list) {
            // allow only picking from the pre-defined list!
            return;
        }
        setSearchMode(searchMode => !searchMode);
    }

    return (
        <div className="formItem">
            <label htmlFor={id}>{label}</label>
            {
                searchMode || !options
                    ? <input
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                    />
                    : <select
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                    >
                        {options}
                    </select>
            }
            {
                // if there is no pre-defined list, we allow switching between cache/search
                !list &&
                <span
                    className={searchMode ? "icon from-cache" : "icon search"}
                    onClick={switchMode}
                />
            }
        </div>
    )
}