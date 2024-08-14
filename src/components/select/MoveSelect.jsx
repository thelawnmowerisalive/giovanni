import { useContext } from "react";
import LanguageContext from "../../LanguageContext";
import Pokedex from "../../model/Pokedex";

export default function MoveSelect({ id, label, value, onChange, moves }) {
    const language = useContext(LanguageContext);

    const options = moves.map(key =>
        <option key={key} value={key}>
            {Pokedex.INSTANCE.moves[key].names[language]}
        </option>);

    return (
        <div className="formItem">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
            >
                {options}
            </select>
        </div>
    )
}