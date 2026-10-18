import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} from "../services/pokemonListApi";

export function usePokemonFilter(offset, limit, setOffset) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const typeQuery = searchParams.get("type") || "";
  const genQuery = searchParams.get("gen") || "";

  useEffect(() => {
    if (setOffset) setOffset(0);
  }, [genQuery, typeQuery, setOffset]);

  const generalQuery = useGetPokemonsQuery(
    { limit, offset },
    { skip: Boolean(genQuery || typeQuery) },
  );
  const genQueryRes = useGetPokemonsByGenQuery(genQuery, { skip: !genQuery });
  const typeQueryRes = useGetPokemonsByTypeQuery(typeQuery, {
    skip: !typeQuery,
  });

  const activeData = genQuery
    ? genQueryRes
    : typeQuery
      ? typeQueryRes
      : generalQuery;

  const { data, isLoading, isFetching, error } = activeData;

  const filteredPokemons = data?.results?.filter((pokemon) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = pokemon.name.toLowerCase().includes(query);
      const matchesId = String(pokemon.id).includes(query);
      if (!matchesName && !matchesId) return false;
    }

    if (typeQuery && genQuery) {
      const matchesType = pokemon.types?.some(
        (t) => t.toLowerCase() === typeQuery.toLowerCase(),
      );
      if (!matchesType) return false;
    }

    return true;
  });

  const isFiltered = Boolean(searchQuery || typeQuery || genQuery);

  return {
    pokemons: filteredPokemons,
    isLoading,
    isFetching,
    error,
    hasMore: data?.results?.length < (data?.count || 1302),
    isFiltered,
  };
}
