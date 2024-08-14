import { APP_NAME, BASE_URL, HASHES, POKEDEX } from "../Constants";
import PokemonMove from "./PokemonMove";
import PokemonTemplate from "./PokemonTemplate";
import PokemonType from "./PokemonType";

export default class Pokedex {
    constructor() {
        this.pokemon = {};
        this.moves = {};
        this.types = {};

        this.ready = false;
    }

    static INSTANCE = new Pokedex();

    static async initialize() {
        if (Pokedex.INSTANCE.ready) {
            return;
        }
        const pokedex = await getCachedData(POKEDEX);
        if (!pokedex) {
            return;
        }
        for (let pokemon of pokedex) {
            Pokedex.INSTANCE.add(pokemon);
        }
        Pokedex.INSTANCE.ready = true;
    }

    /**
     * Add the pokemon to the Pokemon map, by converting the necessary data
     * received from the data API.
     * @returns 
     */
    add({
        formId, names, stats,
        primaryType, secondaryType,
        quickMoves, cinematicMoves, eliteQuickMoves, eliteCinematicMoves,
        regionForms
    }) {
        const pokemon = new PokemonTemplate(formId, names, stats);

        // types
        primaryType && pokemon.types.push(this.addType(primaryType));
        secondaryType && pokemon.types.push(this.addType(secondaryType));

        // moves
        this.createAndAddMoves(quickMoves, pokemon.fastMoves);
        this.createAndAddMoves(cinematicMoves, pokemon.chargedMoves);
        this.createAndAddMoves(eliteQuickMoves, pokemon.eliteFastMoves);
        this.createAndAddMoves(eliteCinematicMoves, pokemon.eliteChargedMoves);

        // add regional forms separately
        for (let regionFormId in regionForms) {
            this.add(regionForms[regionFormId]);
        }

        // save in map
        this.pokemon[formId] = pokemon;
    }

    /**
     * Add the type to the types map, if it does not already exist.
     * @returns the id of the type
     */
    addType({ type, names }) {
        if (!this.types[type]) {
            this.types[type] = new PokemonType(type, names)
        }
        return type;
    }

    /**
     * Adds the move to the moves map, if it does not already exist.
     * @returns the id of the move
     */
    addMove(move) {
        const id = move.id;
        if (!this.moves[id]) {
            this.moves[id] = new PokemonMove(move);
        }
        return id;
    }

    /**
     * Converts the list of moves from the API, to the moves that will be added
     * to the PokemonTemplate. Each move is added to the moves map.
     */
    createAndAddMoves(source, target) {
        for (let name in source) {
            let move = source[name];
            let { id, names } = move;
            let { energy, power, turns, buffs } = move.combat;
            target.push(this.addMove(
                { id, names, type: move.type.type, energy, power, turns, buffs }
            ));
        }
    }
}

async function updateData() {
    const cache = await caches.open(APP_NAME);

    var hashes = await cache.match(BASE_URL + HASHES);
    if (!hashes) {
        // first time using the app in this browser, so request all the data
        console.log('Download all data...');
        await cache.add(BASE_URL + HASHES);
        await cache.add(BASE_URL + POKEDEX);
    } else {
        // compare with fresh hashes
        const fresh = await requestData(HASHES);
        const old = await hashes.json();
        if (fresh.sha512[POKEDEX] === old.sha512[POKEDEX]) {
            console.log('Pokedex is up-to-date, nothing to do.');
        } else {
            console.log('Updating pokedex...');
            await cache.add(BASE_URL + HASHES);
            await cache.add(BASE_URL + POKEDEX);
        }
    }
}

async function getCachedData(url) {
    await updateData();

    const cache = await caches.open(APP_NAME);
    const cachedResponse = await cache.match(BASE_URL + url);
    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    } else {
        return await cachedResponse.json();
    }
}

async function requestData(url) {
    const response = await fetch(BASE_URL + url);
    if (!response.ok) {
        // TODO show error
        console.log("ERROR");
    }
    return await response.json();
}