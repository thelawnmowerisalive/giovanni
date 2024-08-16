import { useEffect, useState } from "react";
import Moves from "../model/Moves";
import Pokedex from "../model/Pokedex";
import Pokemon from "../model/Pokemon";
import RocketTrainer from "../model/RocketTrainer";
import Stats from "../model/Stats";
import Trainer from "../model/Trainer";
import PokemonStorage from "../PokemonStorage";
import Modal from "./Modal";
import "./Pokemon.css";
import MoveSelect from "./select/MoveSelect";
import PokemonSelect from "./select/PokemonSelect";
import StatSelect from "./select/StatSelect";

/**
 * @param {Props}
 */
export default function PokemonDetailsModal({ trainer, pokemon, onClose }) {
    const [name, setName] = useState(pokemon?.name || '');

    const createState = (pokemon) => {
        return {
            fastMove: pokemon?.moves?.fast || '',
            chargedMove: pokemon?.moves?.charged_1 || '',
            attack: pokemon?.ivs.attack || 15,
            defense: pokemon?.ivs.defense || 15,
            stamina: pokemon?.ivs.stamina || 15,
            level: pokemon?.level || trainer.level
        }
    }
    const [state, setState] = useState(() => createState(pokemon));

    const [template, setTemplate] = useState(undefined);
    const [fastMoves, setFastMoves] = useState([]);
    const [chargedMoves, setChargedMoves] = useState([]);

    const [result, setResult] = useState(undefined);

    /**
     * Every time the name changes, we look up the pokemon in the dex.
     */
    useEffect(() => {
        const template = Pokedex.INSTANCE.pokemon[name];
        setTemplate(template);

        if (template) { // TODO allow selection of legacy moves
            setFastMoves(template.fastMoves);
            setChargedMoves(template.chargedMoves);
            setState({
                ...state,
                fastMove: state.fastMove || template.fastMoves[0],
                chargedMove: state.chargedMove || template.chargedMoves[0]
            });
        } else {
            setFastMoves([]);
            setChargedMoves([]);
            setState(createState());
        }

        // load the pokemon from cache
        if (PokemonStorage.index.includes(name)) {
            setState(createState(PokemonStorage.get(name)));
        }
    }, [name]);

    /**
     * Every time the form data changes, retrain the pokemon to update the CP.
     */
    useEffect(() => {
        if (!template) {
            setResult(undefined);
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
    }, [state]);

    /**
     * Input change handler.
     */
    const onChange = ({ target }) => {
        const { name, value, type } = target;
        setState(prev => ({
            ...prev,
            [name]: ["number", "range"].indexOf(type) >= 0 ? Number.parseInt(value) : value
        }));
    }

    const upload = () => {
        if (!result) {
            return;
        }
        PokemonStorage.put(name, result);
    }

    const notRocket = !(trainer instanceof RocketTrainer);

    return (
        <Modal onClose={() => onClose(result)}>
            <>
                <form>
                    <PokemonSelect
                        id="name"
                        label="Name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
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
                    {
                        notRocket &&
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
                {
                    notRocket &&
                    <button onClick={upload} disabled={!template}>
                        <i className="icon to-cache" />
                    </button>
                }
            </>
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