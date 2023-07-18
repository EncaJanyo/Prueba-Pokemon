import { defineStore } from 'pinia';
import { Pokemons, Pokemon } from '../services/pokemon';
import { Notify } from '../services/notification';

export const usePokemonStore = defineStore({
	id: 'pokemon',
	state: () => ({
		pokemons: [],
        pokemon: {},
	}),
	actions: {
		async Action_Pokemons() {
			const data = await Pokemons();
            if (data) this.pokemons = data;
		},
        async Action_Pokemon(id) {
			const data = await Pokemon(id);
            if (data) this.pokemon = data;
		}
	}
});