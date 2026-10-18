import { useEffect, useRef, useState } from "react";
import PokemonCard from "../components/list/PokemonCard";
import SearchFilter from "../components/common/SearchFilter";
import { PokemonGrid } from "../components/common/Grid";
import {
  SpinnerWrapper,
  PokeballIcon,
} from "../components/common/PokeballSpinner.styles";
import { usePokemonFilter } from "../hooks/usePokemonFilter";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const limit = 40;

  const { pokemons, isLoading, isFetching, error, hasMore, isFiltered } =
    usePokemonFilter(offset, limit, setOffset);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (isFiltered) return;

    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setOffset((prev) => prev + limit);
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, isFetching, isFiltered, limit, setOffset]);

  const isInitialFilterLoading =
    isFetching && (!pokemons || pokemons?.length === 0 || isLoading);

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
        {pokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemonId={pokemon.id}
            pokemonBasicName={pokemon.name}
            pokemonSprite={pokemon.sprite}
            pokemonTypes={pokemon.types}
          />
        ))}
      </PokemonGrid>

      {pokemons?.length === 0 && !isFetching && (
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

        {!hasMore && pokemons?.length > 0 && !isFetching && !isFiltered && (
          <p style={{ color: "#888", margin: 0 }}>
            ¡Has visto todos los Pokémon!
          </p>
        )}
      </div>

      {!isFiltered && (
        <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
      )}
    </>
  );
}
