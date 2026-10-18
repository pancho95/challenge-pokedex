import { useEffect, useRef, useState, useMemo } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import PokemonCardSkeleton from "../../components/PokemonCardSkeleton/PokemonCardSkeleton";
import SearchFilter from "../../components/common/Search/SearchFilter";
import { PokemonGrid } from "../../components/common/Grid";
import {
  SpinnerWrapper,
  PokeballIcon,
} from "../../components/common/PokeballSpinner.styles";
import { usePokemonFilter } from "../../hooks/usePokemonFilter";
import { HomePage } from "./Home.styles";
import { SyncStatusIndicator } from "../../components/common/SyncStatusIndicator/SyncStatusIndicator.styles";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const limit = 40;

  const [visibleCount, setVisibleCount] = useState(40);

  const { pokemons, isLoading, isFetching, error, hasMore, isFiltered } =
    usePokemonFilter(offset, limit, setOffset);

  useEffect(() => {
    setVisibleCount(40);
  }, [isFiltered, pokemons?.length]);

  const displayedPokemons = useMemo(() => {
    return pokemons?.slice(0, visibleCount) || [];
  }, [pokemons, visibleCount]);

  const hasMoreLocal = displayedPokemons.length < (pokemons?.length || 0);
  const canLoadMore = hasMoreLocal || (!isFiltered && hasMore);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          if (hasMoreLocal) {
            setVisibleCount((prev) => prev + limit);
          } else if (!isFiltered && hasMore) {
            setOffset((prev) => prev + limit);
          }
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMoreLocal, hasMore, isFetching, isFiltered, limit, setOffset]);

  const isInitialFilterLoading =
    isFetching && (!pokemons || pokemons?.length === 0 || isLoading);

  return (
    <HomePage>
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          margin: "0 0 20px 0",
          fontWeight: 800,
        }}
      >
        Listado de Pokémon
      </h1>

      <SyncStatusIndicator $isFetching={isFetching}>
        <span className="pulse-dot" />
        {isLoading
          ? "Cargando..."
          : isFetching
            ? "Actualizando datos frescos..."
            : "Datos desde caché (Instantáneo)"}
      </SyncStatusIndicator>

      <SearchFilter />

      {error && (
        <p style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
          Hubo un error al cargar los datos. Por favor, intenta nuevamente.
        </p>
      )}

      {isInitialFilterLoading && !error ? (
        <PokemonGrid>
          {Array.from({ length: 12 }).map((_, index) => (
            <PokemonCardSkeleton key={`skeleton-${index}`} />
          ))}
        </PokemonGrid>
      ) : (
        <>
          <PokemonGrid>
            {displayedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id || pokemon.name}
                pokemonId={pokemon.id}
                pokemonBasicName={pokemon.name}
                pokemonSprite={pokemon.sprite}
                pokemonTypes={pokemon.types}
              />
            ))}
          </PokemonGrid>

          {pokemons?.length === 0 && !isFetching && !error && (
            <p style={{ textAlign: "center", padding: "40px", color: "#777" }}>
              No se encontraron Pokémon con los filtros especificados.
            </p>
          )}
        </>
      )}

      <div style={{ minHeight: "70px", margin: "24px 0", textAlign: "center" }}>
        {isFetching && !isInitialFilterLoading && (
          <SpinnerWrapper>
            <PokeballIcon />
            <span>Cargando más Pokémon...</span>
          </SpinnerWrapper>
        )}

        {!canLoadMore && pokemons?.length > 0 && !isFetching && (
          <p style={{ color: "#888", margin: 0 }}>
            ¡Has visto todos los Pokémon!
          </p>
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
    </HomePage>
  );
}
