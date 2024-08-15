import { useContext, useEffect, useState } from "react";
import LanguageContext from "../../LanguageContext";
import Pokedex from "../../model/Pokedex";

export default function PokemonSelect({ id, label, value, onChange, list }) {
    const language = useContext(LanguageContext);
    const [options, setOptions] = useState(undefined);
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        if (list) {
            setSearchMode(false);
            setOptions([
                <option key="" value="" disabled>Select from cache...</option>,
                list.map(key => (
                    <option key={key} value={key}>
                        {Pokedex.INSTANCE.pokemon[key].names[language]}
                    </option>
                )),
                <option key="reset" value="reset" className="italic">Or add new...</option>]);
        } else {
            setSearchMode(true);
            setOptions(undefined);
        }
    }, [list]);

    useEffect(() => {
        console.log(searchMode);
    }, [searchMode]);

    const switchMode = () => {
        setSearchMode(searchMode => !searchMode);
    }

    return (
        <div className="formItem">
            <label htmlFor={id}>{label}</label>
            {
                searchMode
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
            <span
                className={searchMode ? "icon download" : "icon search"}
                onClick={switchMode}
            />
        </div>
    )
}