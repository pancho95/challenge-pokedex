import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_POKEMON_API_ENDPOINT,
  }),
  tagTypes: ["Pokemon", "Type"],
  endpoints: () => ({}),
});
