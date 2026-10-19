import { baseApi } from "./baseApi";

export const pokemonListApi = baseApi.injectEndpoints({
  serializeQueryArgs: ({ endpointName, queryArgs }) => {
    return `${endpointName}-${JSON.stringify(queryArgs)}`;
  },
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 40, offset = 0 }) =>
        `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map(({ id }) => ({ type: "Pokemon", id })),
              { type: "Pokemon", id: "LIST" },
            ]
          : [{ type: "Pokemon", id: "LIST" }],
      transformResponse: (response) => {
        return {
          count: response.count,
          results: response.results.map((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return {
              id: Number(id),
              name: p.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }),
        };
      },
    }),

    getPokemonsByGen: builder.query({
      query: (genId) => `generation/${genId}`,
      providesTags: (result, error, genId) => [
        { type: "Pokemon", id: `GEN_${genId}` },
      ],
      transformResponse: (response) => {
        return {
          results: response.pokemon_species.map((p) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return {
              id: Number(id),
              name: p.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }),
        };
      },
    }),

    getPokemonsByType: builder.query({
      query: (typeName) => `type/${typeName}`,
      providesTags: (result, error, typeName) => [
        { type: "Type", id: typeName },
      ],
      transformResponse: (response) => {
        return {
          results: response.pokemon.map(({ pokemon: p }) => {
            const id = p.url.split("/").filter(Boolean).pop();
            return {
              id: Number(id),
              name: p.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }),
        };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} = pokemonListApi;
