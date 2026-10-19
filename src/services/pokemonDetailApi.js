import { baseApi } from "./baseApi";

export const pokemonDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonDetail: builder.query({
      query: (nameOrId) => `pokemon/${nameOrId}`,
      keepUnusedDataFor: 60,
      providesTags: (result, error, nameOrId) => [
        { type: "Pokemon", id: nameOrId },
      ],
      transformResponse: (response) => {
        return {
          id: response.id,
          name: response.name,
          types: response.types,
          sprites: response.sprites,
          stats: response.stats,
          abilities: response.abilities,
          height: response.height,
          weight: response.weight,
          base_experience: response.base_experience,
        };
      },
    }),
  }),
});

export const { useGetPokemonDetailQuery } = pokemonDetailApi;
