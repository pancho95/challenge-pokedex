import { baseApi } from "./baseApi";

export const pokemonDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonDetail: builder.query({
      query: (nameOrId) => `pokemon/${nameOrId}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetPokemonDetailQuery } = pokemonDetailApi;
