export default class Pokemon {
    constructor(name, level, ivs, moves) {
        this.name = name;
        this.level = level;
        this.ivs = ivs;
        this.moves = moves;

        this.shadow = false;
        this.purified = false; // TODO
        this.lucky = false; // TODO

        // based on ivs and base stats
        this.attack = 0;
        this.defense = 0;
        this.HP = 0;
        this.CP = 0;
    }
}