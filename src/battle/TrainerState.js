import PokemonState from "./PokemonState";

export default class TrainerState {
    constructor(trainer) {
        this.trainer = trainer;

        this.team = [];
        for (let pokemon of trainer.team) {
            this.team.push(new PokemonState(pokemon));
        }

        this.shields = 2;
        this.dead = 0;

        // simulate stunning rockets
        this.wakeUpTurn = 0;
    }
}