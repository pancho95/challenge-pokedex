import { useState, useEffect, useRef } from "react";
import PokemonCard from "../components/list/PokemonCard";
import { useGetPokemonsQuery } from "../services/pokemonListApi";
import { PokemonGrid } from "../components/common/Grid";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data, isLoading, isFetching, error } = useGetPokemonsQuery({
    limit,
    offset,
  });

  const loadMoreRef = useRef(null);
  const hasMore = data?.results?.length < (data?.count || 0);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, isFetching, limit]);

  if (isLoading) return <p>Cargando lista inicial...</p>;
  if (error) return <p>Hubo un error al cargar los datos.</p>;

  return (
    <>
      <h1>Listado de Pokémon</h1>
      <PokemonGrid>
        {data?.results?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemonId={pokemon.id}
            pokemonBasicName={pokemon.name}
            pokemonSprite={pokemon.sprite}
            pokemonTypes={pokemon.types}
          />
        ))}
      </PokemonGrid>

      <div ref={loadMoreRef} style={{ height: "40px", margin: "20px 0" }} />

      {isFetching && (
        <p style={{ textAlign: "center" }}>Cargando más Pokémon...</p>
      )}
      {!hasMore && data?.results?.length > 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>
          ¡Has visto todos los Pokémon!
        </p>
      )}
    </>
  );
}
