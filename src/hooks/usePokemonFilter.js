import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} from "../services/pokemonListApi";

const getPokemonId = (pokemon) => {
  if (pokemon.id) return Number(pokemon.id);
  const urlParts = pokemon.url.split("/").filter(Boolean);
  return Number(urlParts[urlParts.length - 1]);
};

const matchesGeneration = (id, gen) => {
  const ranges = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 905],
    9: [906, 1302],
  };
  const range = ranges[Number(gen)];
  if (!range) return true;
  return id >= range[0] && id <= range[1];
};

export function usePokemonFilter(offset, limit, setOffset) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";
  const typeQuery = searchParams.get("type")?.toLowerCase() || "";
  const genQuery = searchParams.get("gen") || "";

  useEffect(() => {
    if (setOffset) setOffset(0);
  }, [genQuery, typeQuery, searchQuery, setOffset]);

  const isSearching = Boolean(searchQuery);
  const hasGen = Boolean(genQuery);
  const hasType = Boolean(typeQuery);
  const isFiltered = Boolean(isSearching || hasGen || hasType);

  const typeResult = useGetPokemonsByTypeQuery(typeQuery, {
    skip: !hasType,
  });

  const genResult = useGetPokemonsByGenQuery(genQuery, {
    skip: hasType || !hasGen,
  });

  const searchResult = useGetPokemonsQuery(
    { limit: 1302, offset: 0 },
    { skip: !isSearching || hasType || hasGen },
  );

  const defaultResult = useGetPokemonsQuery(
    { limit, offset },
    { skip: isFiltered },
  );

  const activeQuery = hasType
    ? typeResult
    : hasGen
      ? genResult
      : isSearching
        ? searchResult
        : defaultResult;

  const { data, isLoading, isFetching, error } = activeQuery;

  const filteredPokemons = data?.results?.filter((pokemon) => {
    const pokemonId = getPokemonId(pokemon);

    if (searchQuery) {
      const matchesName = pokemon.name.toLowerCase().includes(searchQuery);
      const matchesId = String(pokemonId).includes(searchQuery);
      if (!matchesName && !matchesId) return false;
    }

    if (hasGen && activeQuery !== genResult) {
      if (!matchesGeneration(pokemonId, genQuery)) return false;
    }

    return true;
  });

  return {
    pokemons: isFiltered ? filteredPokemons : data?.results,
    isLoading,
    isFetching,
    error,
    hasMore: !isFiltered && data?.results?.length < (data?.count || 1302),
    isFiltered,
  };
}
