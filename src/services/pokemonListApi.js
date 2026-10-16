// src/services/pokemonListApi.js
import { baseApi } from "./baseApi";

export const pokemonListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemons: builder.query({
      query: ({ limit = 20, offset = 0 } = {}) =>
        `pokemon?limit=${limit}&offset=${offset}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, incomingData, { arg }) => {
        if (arg.offset === 0) return incomingData;
        currentCacheData.results.push(...incomingData.results);
        currentCacheData.next = incomingData.next;
        currentCacheData.previous = incomingData.previous;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonListApi;
