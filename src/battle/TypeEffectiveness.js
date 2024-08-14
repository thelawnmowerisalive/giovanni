const BUG = 'BUG';
const DARK = 'DARK';
const DRAGON = 'DRAGON';
const ELECTRIC = 'ELECTRIC';
const FAIRY = 'FAIRY';
const FIGHTING = 'FIGHTING';
const FIRE = 'FIRE';
const FLYING = 'FLYING';
const GHOST = 'GHOST';
const GRASS = 'GRASS';
const GROUND = 'GROUND';
const ICE = 'ICE';
const NORMAL = 'NORMAL';
const POISON = 'POISON';
const PSYCHIC = 'PSYCHIC';
const ROCK = 'ROCK';
const STEEL = 'STEEL';
const WATER = 'WATER';

const types = [BUG, DARK, DRAGON, ELECTRIC, FAIRY, FIGHTING, FIRE, FLYING, GHOST, GRASS, GROUND, ICE, NORMAL, POISON, PSYCHIC, ROCK, STEEL, WATER];

class TypeEffectiveness {
   
    superEffective;     // 1.6
    notVeryEffective;   // 0.625
    non;                // 0.391
    
    constructor(superEffective, notVeryEffective, non) {
        this.superEffective = superEffective;
        this.notVeryEffective = notVeryEffective;
        this.non = non;
    }

    multiplier(type) {
        if (this.superEffective.indexOf(type) >= 0) {
            return 1.6;
        } else if (this.notVeryEffective.indexOf(type) >= 0) {
            return 0.625;
        } else if (this.non.indexOf(type) >= 0) {
            return 0.391;
        }
        return 1;
    }

    static get(type) {
        return TypeEffectiveness._[type];
    }

    static _ = {
        BUG: new TypeEffectiveness([DARK, GRASS, PSYCHIC], [FAIRY, FIGHTING, FIRE, FLYING, GHOST, POISON, STEEL], []),
        DARK: new TypeEffectiveness([GHOST, PSYCHIC], [DARK, FAIRY, FIGHTING], []),
        DRAGON: new TypeEffectiveness([DRAGON], [STEEL], [FAIRY]),
        ELECTRIC: new TypeEffectiveness([FLYING, WATER], [DRAGON, ELECTRIC, GRASS], [GROUND]),
        FAIRY: new TypeEffectiveness([DARK, DRAGON, FIGHTING], [FIRE, POISON, STEEL], []),
        FIGHTING: new TypeEffectiveness([DARK, ICE, NORMAL, ROCK, STEEL], [BUG, FAIRY, FLYING, POISON, PSYCHIC], [GHOST]),
        FIRE: new TypeEffectiveness([BUG, GRASS, ICE, STEEL], [DRAGON, FIRE, ROCK, WATER], []),
        FLYING: new TypeEffectiveness([BUG, FIGHTING, GRASS], [ELECTRIC, ROCK, STEEL], []),
        GHOST: new TypeEffectiveness([GHOST, PSYCHIC], [DARK], [NORMAL]),
        GRASS: new TypeEffectiveness([GROUND, ROCK, WATER], [BUG, DRAGON, FIRE, FLYING, GRASS, POISON, STEEL], []),
        GROUND: new TypeEffectiveness([ELECTRIC, FIRE, POISON, ROCK, STEEL], [BUG, GRASS], [FLYING]),
        ICE: new TypeEffectiveness([DRAGON, FLYING, GRASS, GROUND], [FIRE, ICE, STEEL, WATER], []),
        NORMAL: new TypeEffectiveness([], [ROCK, STEEL], [GHOST]),
        POISON: new TypeEffectiveness([FAIRY, GRASS], [GHOST, GROUND, POISON, ROCK], [STEEL]),
        PSYCHIC: new TypeEffectiveness([FIGHTING, POISON], [PSYCHIC, STEEL], [DARK]),
        ROCK: new TypeEffectiveness([BUG, FIRE, FLYING, ICE], [FIGHTING, GROUND, STEEL], []),
        STEEL: new TypeEffectiveness([FAIRY, ICE, ROCK], [ELECTRIC, FIRE, STEEL, WATER], []),
        WATER: new TypeEffectiveness([FIRE, GROUND, ROCK], [DRAGON, GRASS, WATER], []),
    }
}

export default TypeEffectiveness;