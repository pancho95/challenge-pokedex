import { baseApi } from "./baseApi";

const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const toPokemonSummary = (p) => {
  const id = p.url.split("/").filter(Boolean).pop();
  return { id: Number(id), name: p.name, sprite: `${SPRITE_BASE}/${id}.png` };
};

export const pokemonListApi = baseApi.injectEndpoints({
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
      transformResponse: (response) => ({
        count: response.count,
        results: response.results.map(toPokemonSummary),
      }),
    }),

    getPokemonsByGen: builder.query({
      query: (genId) => `generation/${genId}`,
      providesTags: (result, error, genId) => [
        { type: "Pokemon", id: `GEN_${genId}` },
      ],
      transformResponse: (response) => ({
        results: response.pokemon_species.map(toPokemonSummary),
      }),
    }),

    getPokemonsByType: builder.query({
      query: (typeName) => `type/${typeName}`,
      providesTags: (result, error, typeName) => [
        { type: "Type", id: typeName },
      ],
      transformResponse: (response) => ({
        results: response.pokemon.map(({ pokemon }) =>
          toPokemonSummary(pokemon),
        ),
      }),
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} = pokemonListApi;
