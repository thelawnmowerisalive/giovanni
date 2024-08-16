export default class PokemonStorage {
    /**
     * Returns a list of all pokemon saved in local storage.
     */
    static get index() {
        return localStorage.getItem(ALL)?.split(SEPARATOR) || [];
    }

    static get team() {
        return localStorage.getItem(TEAM)?.split(SEPARATOR) || [];
    }

    static set team(team) {
        localStorage.setItem(TEAM, team.join(SEPARATOR));
    }

    /**
     * Returns the pokemon saved under this name.
     */
    static get(name) {
        return JSON.parse(localStorage.getItem(PREFIX + name))
    }

    /**
     * Saves the pokemon, also making sure to update the index.
     */
    static put(name, pokemon) {
        localStorage.setItem(
            PREFIX + name,
            JSON.stringify(pokemon)
        );
        if (!PokemonStorage.index.includes(name)) {
            localStorage.setItem(ALL, [...PokemonStorage.index, name].join(SEPARATOR));
        }
    }
}

const PREFIX = "giovanni_";
const ALL = PREFIX + "saved_mon";
const TEAM = PREFIX + "team";
const SEPARATOR = ";";