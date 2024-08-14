export default function PokemonCompactView({ pokemon, onClick }) {
    return (
        <button onClick={onClick}>
            {pokemon.name}
        </button>
    )
}