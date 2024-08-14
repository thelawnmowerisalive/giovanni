import Moves from "./Moves";
import Pokemon from "./Pokemon";
import Stats from "./Stats";
import Strategy from "./Strategy";

export default class Trainer {
    constructor(name, level) {
        this.name = name;
        this.level = level;

        /**
         * @type {Pokemon[]}
         */
        this.team = [];
        this.strategy = new Strategy();
    }

    train(base, level, ivs, moves) {
        // initialize with defaults
        level = level || this.level;
        ivs = ivs || new Stats(15, 15, 15);
        moves = moves || Trainer.randomizeMoveset(base);

        const pokemon = new Pokemon(base.id, level, ivs, moves);

        const multiplier = this.getMultiplier(level);
        pokemon.attack = Trainer.calcBaseStat(base, ivs, 'attack', multiplier);
        pokemon.defense = Trainer.calcBaseStat(base, ivs, 'defense', multiplier);
        pokemon.HP = Trainer.calcBaseStat(base, ivs, 'stamina', multiplier);

        pokemon.CP = Trainer.calcCP(pokemon);

        return pokemon;
    }

    getMultiplier(level) {
        return CPM[level * 2 - 2];
    }

    /**
     * Formula:
     * stat = (base stat + IV) * CPM
     */
    static calcBaseStat(base, ivs, stat, multiplier) {
        return (base.stats[stat] + ivs[stat]) * multiplier;
    }

    /**
     * Formula:
     * cp = 0.1 * (attack * sqrt(defense) * sqrt(hp))
     */
    static calcCP(pokemon) {
        return 0.1 * (pokemon.attack * Math.sqrt(pokemon.defense) * Math.sqrt(pokemon.HP));
    }

    static randomizeMoveset(base, bothCharged = false) {
        const moves = new Moves(
            randomMove(base.fastMoves),
            randomMove(base.chargedMoves)
        )
        bothCharged && (moves.charged_2 = randomMove(base.chargedMoves));
        return moves;
    }
}

const CPM = [0.094, 0.13513743, 0.16639787, 0.19265091, 0.21573247, 0.23657266, 0.25572005, 0.27353038, 0.29024988, 0.30605738, 0.3210876, 0.33544503, 0.34921268, 0.36245776, 0.3752356, 0.38759242, 0.39956728, 0.41119354, 0.4225, 0.43292641, 0.44310755, 0.45305996, 0.4627984, 0.47233608, 0.48168495, 0.49085581, 0.49985844, 0.50870176, 0.51739395, 0.5259425, 0.5343543, 0.54263575, 0.5507927, 0.55883059, 0.5667545, 0.57456913, 0.5822789, 0.5898879, 0.5974, 0.60482366, 0.6121573, 0.61940411, 0.6265671, 0.63364917, 0.64065295, 0.64758096, 0.65443563, 0.66121926, 0.667934, 0.67458189, 0.6811649, 0.68768489, 0.69414365, 0.70054289, 0.7068842, 0.7131691, 0.7193991, 0.72557562, 0.7317, 0.73474102, 0.7377695, 0.74078558, 0.74378943, 0.7467812, 0.74976104, 0.7527291, 0.7556855, 0.75863036, 0.76156384, 0.76448607, 0.76739717, 0.77029727, 0.7731865, 0.77606494, 0.77893275, 0.78179008, 0.784637, 0.78747359, 0.7903, 0.79280394, 0.7953, 0.79780392, 0.8003, 0.80280389, 0.8053, 0.80780387, 0.8103, 0.81280384, 0.8153, 0.81780382, 0.8203, 0.8228038, 0.8253, 0.82780378, 0.8303, 0.83280375, 0.8353, 0.83780373, 0.8403, 0.84280371, 0.8453, 0.84780369, 0.8503, 0.85280366, 0.8553, 0.85780364, 0.8603, 0.86280362, 0.8653];

function randomMove(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}