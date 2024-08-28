import Pokemon from "../model/Pokemon";

export default class PokemonState {
    /**
     * 
     * @param {Pokemon} pokemon 
     */
    constructor(pokemon) {
        this.pokemon = pokemon;

        // round down for actual HP
        this.HP = Math.floor(pokemon.HP);
        this.energy = 0;

        this.last = -10;
    }
}