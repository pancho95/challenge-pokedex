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
        const { sprites } = response;
        return {
          id: response.id,
          name: response.name,
          types: response.types,
          sprites: {
            officialArtwork:
              sprites.other?.["official-artwork"]?.front_default ?? null,
            front: sprites.front_default ?? null,
            back: sprites.back_default ?? null,
            frontShiny: sprites.front_shiny ?? null,
            backShiny: sprites.back_shiny ?? null,
          },
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
