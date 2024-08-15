import { useState } from "react";

export default function PokemonCompactView({ pokemon, HP, energy, onClick }) {
    const percentage = Math.ceil(100 * (Math.max(HP, 0)) / pokemon.HP);
    var backgroundColor = "green";
    if (percentage < 33) {
        backgroundColor = "red";
    } else if (percentage < 50) {
        backgroundColor = "orange";
    }
    return (
        <button onClick={onClick}>
            {pokemon.name}
            {
                !isNaN(HP) &&
                <div className="health-bar">
                    <div style={{ width: percentage + "%", height: "100%", backgroundColor }} />
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