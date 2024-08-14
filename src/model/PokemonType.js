import NamedResource from "./NamedResource";

export default class PokemonType extends NamedResource {
    constructor(type, names) {
        super(names);
        this.type = type;
    }
}