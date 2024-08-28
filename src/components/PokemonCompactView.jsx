import { useState } from "react";
import Event from "./Event";
import Pokedex from "../model/Pokedex";

export default function PokemonCompactView({ pokemon, HP, energy, attacker, onClick }) {
    const health = Math.ceil(100 * (Math.max(HP, 0)) / pokemon.HP);
    var backgroundColor = "green";
    if (health < 33) {
        backgroundColor = "red";
    } else if (health < 50) {
        backgroundColor = "orange";
    }

    return (
        <button onClick={onClick} className={attacker ? "attacker" : ""}>
            {pokemon.name}
            {/* <div className="moves">
                <Event
                    name="fast_move"
                    type={Pokedex.INSTANCE.moves[pokemon.moves.fast].type}
                    size="small"
                />
                <Event
                    name="charged_move"
                    type={Pokedex.INSTANCE.moves[pokemon.moves.charged_1].type}
                    size="large"
                />
            </div> */}

            {
                !isNaN(HP) &&
                <div className="health-bar">
                    <div style={{ width: health + "%", height: "100%", backgroundColor }} />
                </div>
            }
            {
                !isNaN(energy) &&
                <div className="energy-bar">
                    <div style={{ width: Math.min(energy, 100) + "%", height: "100%", backgroundColor: "pink" }} />
                </div>
            }
        </button>
    )
}

function Bar({ percentage, color }) {
    var backgroundColor = color;
    if (!backgroundColor) {
        if (percentage < 33) {
            backgroundColor = "red";
        } else if (percentage < 50) {
            backgroundColor = "orange";
        } else {
            backgroundColor = "green";
        }
    }

    return (
        <div className="health-bar">
            <div style={{ width: percentage + "%", height: "100%", backgroundColor }} />
        </div>
    )
}