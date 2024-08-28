export default function Event({ name, type, color, size }) {
    const backgroundColor = type ? (COLORS[type] || COLORS["POKEMON_TYPE_" + type]) : color;
    return <i
        className={`icon ${name} ${size}`}
        style={{ backgroundColor }}
    />
}

const COLORS = {
    NONE: 'gray',
    POKEMON_TYPE_BUG: '#91A119',
    POKEMON_TYPE_DARK: '#624D4E',
    POKEMON_TYPE_DRAGON: '#5060E1',
    POKEMON_TYPE_ELECTRIC: '#FAC000',
    POKEMON_TYPE_FAIRY: '#EF70EF',
    POKEMON_TYPE_FIGHTING: '#FF8000',
    POKEMON_TYPE_FIRE: '#E62829',
    POKEMON_TYPE_FLYING: '#81B9EF',
    POKEMON_TYPE_GHOST: '#704170',
    POKEMON_TYPE_GRASS: '#3FA129',
    POKEMON_TYPE_GROUND: '#915121',
    POKEMON_TYPE_ICE: '#3DCEF3',
    POKEMON_TYPE_NORMAL: '#9FA19F',
    POKEMON_TYPE_POISON: '#9141CB',
    POKEMON_TYPE_PSYCHIC: '#EF4179',
    POKEMON_TYPE_ROCK: '#AFA981',
    POKEMON_TYPE_STEEL: '#60A1B8',
    POKEMON_TYPE_WATER: '#2980EF'
}