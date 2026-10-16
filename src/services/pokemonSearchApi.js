import { baseApi } from "./baseApi";

export const pokemonSearchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchPokemon: builder.query({
      query: (searchTerm) => `pokemon/${searchTerm.toLowerCase().trim()}`,
    }),

    getPokemonsByType: builder.query({
      query: (typeName) => `type/${typeName}`,
    }),
  }),
});

export const {
  useSearchPokemonQuery,
  useLazySearchPokemonQuery,
  useGetPokemonsByTypeQuery,
} = pokemonSearchApi;
