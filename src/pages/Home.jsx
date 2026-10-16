import PokemonCard from "../components/list/PokemonCard";
import { useGetPokemonsQuery } from "../services/pokemonListApi";
import { Grid, PokemonGrid } from "../components/common/Grid";

export default function Home() {
  // Desestructuramos las propiedades clave que provee RTK Query
  const { data, isLoading, isFetching, error } = useGetPokemonsQuery({
    limit: 20,
    offset: 0,
  });

  if (isLoading) return <p>Cargando lista inicial...</p>;
  if (error) return <p>Hubo un error al cargar los datos.</p>;

  return (
    <>
      <h1>Listado de Pokémon</h1>
      <PokemonGrid>
        {data?.results?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonBasicName={pokemon.name}
            pokemonUrl={pokemon.url}
          />
        ))}
      </PokemonGrid>

      {/* Indicador útil si estás cargando más elementos mediante infinite scroll */}
      {isFetching && <p>Actualizando / Cargando más...</p>}
    </>
  );
}
