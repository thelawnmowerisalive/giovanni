import NamedResource from "./NamedResource";

export default class PokemonMove extends NamedResource {
    constructor(move) {
        super(move.names);
        Object.assign(this, move);
    }
}