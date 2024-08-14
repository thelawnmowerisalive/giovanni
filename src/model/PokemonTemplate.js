import NamedResource from "./NamedResource";

export default class PokemonTemplate extends NamedResource {
    constructor(id, names, stats) {
        super(names);
        this.id = id;
        this.stats = stats;

        this.types = [];
        this.fastMoves = [];
        this.chargedMoves = [];
        this.eliteFastMoves = [];
        this.eliteChargedMoves = [];
    }
}