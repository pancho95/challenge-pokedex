import { baseApi } from "./baseApi";

export const pokemonListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 20, offset = 0 } = {}) =>
        `pokemon?limit=${limit}&offset=${offset}`,

      async transformResponse(response) {
        const detailedPokemonPromises = response.results.map(async (p) => {
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

        const detailedResults = await Promise.all(detailedPokemonPromises);

        return {
          ...response,
          results: detailedResults,
        };
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
  }),
});

export const { useGetPokemonsQuery } = pokemonListApi;
