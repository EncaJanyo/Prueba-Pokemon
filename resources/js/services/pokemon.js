import Api from './api'

export async function Pokemons() {
    const data = await new  Api().get('api/get-pokemons');

    if(!data?.data?.results) return null;

	return data.data.results.map((pokemon) => ({
		id: parseInt(pokemon.url.slice(0,-1).split('/').pop() ?? '0'),
		name: pokemon.name,
	}));
}

export async function Pokemon(id) {
    const data =  await new  Api().get('api/get-pokemon/'+ id);

    if(!data?.data) return null;

	return {
		name: data.data.name,
		image: data.data.sprites.back_default,
        abilities: data.data.abilities
	};
}


