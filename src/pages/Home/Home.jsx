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
import { useSearchParams } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState/EmptyState";

export default function Home() {
  const limit = 40;
  const [visibleCount, setVisibleCount] = useState(40);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [, setSearchParams] = useSearchParams();

  const { pokemons, isLoading, isFetching, error, isFiltered, refetch } =
    usePokemonFilter();

  useEffect(() => {
    setVisibleCount(40);
  }, [isFiltered]);

  const displayedPokemons = useMemo(() => {
    return pokemons?.slice(0, visibleCount) || [];
  }, [pokemons, visibleCount]);

  const hasMore = displayedPokemons.length < (pokemons?.length || 0);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + limit);
            setIsLoadingMore(false);
          }, 200);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, limit, isLoadingMore]);

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
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#ef4444", marginBottom: "16px" }}>
            Hubo un error al cargar los datos. Por favor, intenta nuevamente.
          </p>
          <button
            onClick={() => refetch()}
            type="button"
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reintentar conexión
          </button>
        </div>
      )}

      {isLoading && !error ? (
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

          {pokemons?.length === 0 && !isLoading && !error && (
            <EmptyState
              title="Sin resultados"
              description="No encontramos Pokémon con esos filtros. Probá con otro nombre, tipo o generación."
              actionLabel="Limpiar filtros"
              onAction={() => setSearchParams({}, { replace: true })}
            />
          )}
        </>
      )}

      <div style={{ minHeight: "70px", margin: "24px 0", textAlign: "center" }}>
        {hasMore && (
          <SpinnerWrapper>
            <PokeballIcon />
            <span>Cargando más Pokémon...</span>
          </SpinnerWrapper>
        )}

        {!hasMore && pokemons?.length > 0 && (
          <p style={{ color: "#888", margin: 0 }}>
            ¡Has visto todos los Pokémon!
          </p>
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: "20px", width: "100%" }} />
    </HomePage>
  );
}
