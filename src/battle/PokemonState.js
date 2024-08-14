export default class PokemonState {
    constructor(pokemon) {
        this.pokemon = pokemon;

        // round down for actual HP
        this.HP = Math.floor(pokemon.HP);
        this.energy = 0;

        this.last = -10;
    }
}