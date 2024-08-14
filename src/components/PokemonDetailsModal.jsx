import { useEffect, useState } from "react";
import Moves from "../model/Moves";
import Pokedex from "../model/Pokedex";
import Pokemon from "../model/Pokemon";
import RocketTrainer from "../model/RocketTrainer";
import Stats from "../model/Stats";
import Trainer from "../model/Trainer";
import Modal from "./modal";
import MoveSelect from "./select/MoveSelect";
import StatSelect from "./select/StatSelect";

/**
 * @param {Props}
 */
export default function PokemonDetailsModal({ trainer, pokemon, onClose }) {
    const [state, setState] = useState({
        name: pokemon?.name || '',
        fastMove: pokemon?.moves?.fast || '',
        chargedMove: pokemon?.moves?.charged_1 || '',
        attack: pokemon?.ivs.attack || 15,
        defense: pokemon?.ivs.defense || 15,
        stamina: pokemon?.ivs.stamina || 15,
        level: pokemon?.level || trainer.level
    });
    const [template, setTemplate] = useState(undefined);
    const [fastMoves, setFastMoves] = useState([]);
    const [chargedMoves, setChargedMoves] = useState([]);

    const [result, setResult] = useState(undefined);

    /**
     * Every time the name changes, we look up the pokemon in the dex.
     */
    useEffect(() => {
        console.log("changed name to " + state.name);
        setTemplate(Pokedex.INSTANCE.pokemon[state.name]);
    }, [state.name]);

    /**
     * Every time the selected pokemon changes, repopulate the move options.
     */
    useEffect(() => {
        console.log(template);
        if (template) { // TODO allow selection of legacy moves
            setFastMoves(template.fastMoves);
            setChargedMoves(template.chargedMoves);
            setState({
                ...state,
                fastMove: state.fastMove || template.fastMoves[0],
                chargedMove: state.chargedMove || template.chargedMoves[0]
            });
        }
    }, [template]);

    /**
     * Every time the form data changes, retrain the pokemon to update the CP.
     */
    useEffect(() => {
        if (!template) {
            return;
        }
        const pokemon = trainer.train(
            template,
            state.level,
            new Stats(state.attack, state.defense, state.stamina),
            new Moves(state.fastMove, state.chargedMove)
        );
        console.log(pokemon);
        setResult(pokemon);
    }, [template, state]);

    const onChange = ({ target }) => {
        const { name, value, type } = target;
        console.log(value);
        setState(prev => ({
            ...prev,
            [name]: ["number", "range"].indexOf(type) >= 0 ? Number.parseInt(value) : value
        }));
    }

    return (
        <Modal onClose={() => onClose(result)}>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        value={state.name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    CP {Math.floor(result?.CP)}
                </div>
                <MoveSelect
                    id="fastMove"
                    label="Fast Move"
                    value={state.fastMove}
                    onChange={onChange}
                    moves={fastMoves}
                />
                <MoveSelect
                    id="chargedMove"
                    label="Charged Move"
                    value={state.chargedMove}
                    onChange={onChange}
                    moves={chargedMoves}
                />
                {!(trainer instanceof RocketTrainer) &&
                    <div>
                        <StatSelect
                            id="attack"
                            label="Attack"
                            value={state.attack}
                            onChange={onChange}
                        />
                        <StatSelect
                            id="defense"
                            label="Defense"
                            value={state.defense}
                            onChange={onChange}
                        />
                        <StatSelect
                            id="stamina"
                            label="HP"
                            value={state.stamina}
                            onChange={onChange}
                        />
                        <div className="formItem">
                            <label htmlFor="level">Level</label>
                            <input
                                type="range"
                                min={1} max={50}
                                id="level"
                                name="level"
                                value={trainer.level}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                }
            </form>
        </Modal>
    )
}

class Props {
    /**
     * @type {Trainer}
     */
    trainer;
    /**
     * @type {Pokemon}
     */
    pokemon;
}