import { baseApi } from "./baseApi";

const fetchInBatches = async (items, batchSize = 10, fetchFn) => {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fetchFn));
    results.push(...batchResults);
  }
  return results;
};

export const pokemonListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 20, offset = 0 } = {}) =>
        `pokemon?limit=${limit}&offset=${offset}`,
      async transformResponse(response) {
        const detailedPromises = response.results.map(async (p) => {
          const res = await fetch(p.url);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            url: p.url,
            sprite:
              data.sprites.other?.["official-artwork"]?.front_default ||
              data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
          };
        });
        const results = await Promise.all(detailedPromises);
        return { ...response, results };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, incomingData, { arg }) => {
        if (arg.offset === 0) return incomingData;
        currentCacheData.results.push(...incomingData.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),

    getPokemonsByGen: builder.query({
      query: (genId) => `generation/${genId}`,
      async transformResponse(response) {
        const species = response.pokemon_species;

        const pokemonIds = species
          .map((s) => {
            return Number(s.url.split("/").filter(Boolean).pop());
          })
          .sort((a, b) => a - b);

        const fetchPokemonDetail = async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            sprite:
              data.sprites.other?.["official-artwork"]?.front_default ||
              data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
          };
        };

        const results = await fetchInBatches(
          pokemonIds,
          15,
          fetchPokemonDetail,
        );
        return { results };
      },
    }),

    getPokemonsByType: builder.query({
      query: (typeName) => `type/${typeName}`,
      async transformResponse(response) {
        const pokemonList = response.pokemon;

        const fetchTypeDetail = async ({ pokemon }) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            url: pokemon.url,
            sprite:
              data.sprites.other?.["official-artwork"]?.front_default ||
              data.sprites.front_default,
            types: data.types.map((t) => t.type.name),
          };
        };

        const results = await fetchInBatches(pokemonList, 12, fetchTypeDetail);
        results.sort((a, b) => a.id - b.id);
        return { results };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} = pokemonListApi;
