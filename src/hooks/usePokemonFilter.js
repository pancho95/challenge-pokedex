import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} from "../services/pokemonListApi";

export function usePokemonFilter(offset, limit, setOffset) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";
  const typeQuery = searchParams.get("type") || "";
  const genQuery = searchParams.get("gen") || "";

  useEffect(() => {
    if (setOffset) setOffset(0);
  }, [genQuery, typeQuery, searchQuery, setOffset]);

  const isSearching = Boolean(searchQuery);

  const searchResult = useGetPokemonsQuery(
    { limit: 1302, offset: 0 },
    { skip: !isSearching },
  );

  const genResult = useGetPokemonsByGenQuery(genQuery, {
    skip: isSearching || !genQuery,
  });

  const typeResult = useGetPokemonsByTypeQuery(typeQuery, {
    skip: isSearching || Boolean(genQuery) || !typeQuery,
  });

  const defaultResult = useGetPokemonsQuery(
    { limit, offset },
    { skip: isSearching || Boolean(genQuery) || Boolean(typeQuery) },
  );

  const activeQuery = isSearching
    ? searchResult
    : genQuery
      ? genResult
      : typeQuery
        ? typeResult
        : defaultResult;

  const { data, isLoading, isFetching, error } = activeQuery;

  const filteredPokemons = data?.results?.filter((pokemon) => {
    if (searchQuery) {
      const pokemonId =
        pokemon.id || pokemon.url.split("/").filter(Boolean).pop();

      const matchesName = pokemon.name.toLowerCase().includes(searchQuery);
      const matchesId = String(pokemonId).includes(searchQuery);
      if (!matchesName && !matchesId) return false;
    }

    if (typeQuery && !genQuery) {
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
    hasMore: !isSearching && data?.results?.length < (data?.count || 1302),
    isFiltered,
  };
}
