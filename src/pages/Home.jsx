import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PokemonCard from "../components/list/PokemonCard";
import SearchFilter from "../components/common/SearchFilter";
import {
  useGetPokemonsQuery,
  useGetPokemonsByGenQuery,
  useGetPokemonsByTypeQuery,
} from "../services/pokemonListApi";
import { PokemonGrid } from "../components/common/Grid";
import {
  SpinnerWrapper,
  PokeballIcon,
} from "../components/common/PokeballSpinner.styles";

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const typeQuery = searchParams.get("type") || "";
  const genQuery = searchParams.get("gen") || "";

  const [offset, setOffset] = useState(0);
  const limit = 40;

  useEffect(() => {
    setOffset(0);
  }, [genQuery, typeQuery]);

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

  const loadMoreRef = useRef(null);
  const hasMore = data?.results?.length < (data?.count || 1302);

  const displayedPokemons = data?.results?.filter((pokemon) => {
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(pokemon.id).includes(searchQuery);
    return matchesSearch;
  });

  useEffect(() => {
    if (genQuery || typeQuery) return;
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isFetching &&
          !searchQuery
        ) {
          setOffset((prev) => prev + limit);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, isFetching, searchQuery, genQuery, typeQuery, limit]);

  const isInitialFilterLoading =
    isFetching && (!data || data?.results?.length === 0 || isLoading);

  if (isInitialFilterLoading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <SpinnerWrapper>
          <PokeballIcon />
          <span>Buscando Pokémon...</span>
        </SpinnerWrapper>
      </div>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Hubo un error al cargar los datos.
      </p>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Listado de Pokémon
      </h1>

      <SearchFilter />

      <PokemonGrid>
        {displayedPokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemonId={pokemon.id}
            pokemonBasicName={pokemon.name}
            pokemonSprite={pokemon.sprite}
            pokemonTypes={pokemon.types}
          />
        ))}
      </PokemonGrid>

      {displayedPokemons?.length === 0 && !isFetching && (
        <p style={{ textAlign: "center", padding: "40px", color: "#777" }}>
          No se encontraron Pokémon con los filtros especificados.
        </p>
      )}

      <div style={{ minHeight: "70px", margin: "24px 0", textAlign: "center" }}>
        {isFetching && (
          <SpinnerWrapper>
            <PokeballIcon />
            <span>Cargando más Pokémon...</span>
          </SpinnerWrapper>
        )}

        {!hasMore &&
          data?.results?.length > 0 &&
          !isFetching &&
          !genQuery &&
          !typeQuery && (
            <p style={{ color: "#888", margin: 0 }}>
              ¡Has visto todos los Pokémon!
            </p>
          )}
      </div>

      {!genQuery && !typeQuery && (
        <div ref={loadMoreRef} style={{ height: "10px" }} />
      )}
    </>
  );
}
