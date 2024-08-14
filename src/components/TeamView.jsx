import { useState } from "react";
import Trainer from "../model/Trainer";
import PokemonCompactView from "./PokemonCompactView";
import "./Team.css";
import PokemonDetailsModal from "./PokemonDetailsModal";

/**
 * @param {Props} 
 */
export default function TeamView({ trainer }) {
    const [mode, setMode] = useState('');

    const handleAddPokemon = () => {
        setMode(ADD_MODE);
    }

    const handleEditPokemon = (index) => {
        setMode(index + EDIT_MODE);
    }

    const addPokemon = (pokemon) => {
        setMode('');
        if (pokemon) {
            trainer.team.push(pokemon);
            console.log(trainer);
        }
    }

    const editPokemon = (pokemon, index) => {
        setMode('');
        if (pokemon) {
            trainer.team[index] = pokemon;
            console.log(trainer);
        }
    }

    return (
        <>
            <div className="team">
                {trainer.name} {trainer.level}
                <div className="compact">
                    {trainer.team.map((pokemon, index) =>
                        <PokemonCompactView
                            key={index}
                            pokemon={pokemon}
                            onClick={() => handleEditPokemon(index)}
                        />)
                    }
                    {trainer.team.length < 3 && <PlusButton onAddPokemon={handleAddPokemon} />}
                </div>
            </div>

            {ADD_MODE === mode && <PokemonDetailsModal trainer={trainer} onClose={addPokemon} />}
            {mode.endsWith(EDIT_MODE) && (() => {
                const index = Number.parseInt(mode);
                return <PokemonDetailsModal trainer={trainer} pokemon={trainer.team[index]} onClose={(pokemon) => editPokemon(pokemon, index)} />;
            })()
            }
        </>
    )
}

class Props {
    /**
     * @type {Trainer}
     */
    trainer;
}

const ADD_MODE = "ADD";
const EDIT_MODE = "EDIT"

function PlusButton({ onAddPokemon }) {
    return (
        <button className="add" onClick={() => onAddPokemon()}>+</button>
    );
}