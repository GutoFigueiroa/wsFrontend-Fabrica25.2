interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonListResponse {
    results: PokemonResult[];
}
export const fetchPokemonList = async (limit: number = 20) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    );

    if (!response.ok) {
        throw new Error('Erro ao buscar a lista de Pokémon');
    }

    const data = await response.json();

    const detailedPokemonPromises = data.results.map(async (pokemon: PokemonResult) => {
        const res = await fetch(pokemon.url);
        if (!res.ok) {
            console.error(`Falha ao carregar ${pokemon.name}`);
            return null;
        }
        return res.json();
    });

    const detailedPokemon = await Promise.all(detailedPokemonPromises);

    return detailedPokemon.filter(Boolean);
};

export const fetchPokemonByIdOrName = async (query: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) {
        return null;
    }

    return response.json();
};