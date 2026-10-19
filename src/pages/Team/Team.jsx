import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reorderTeam } from "../../features/pokemon/pokemonSlice";
import { TeamPage, HeaderSection, TeamCounter, TeamGrid } from "./Team.styles";
import EmptyState from "../../components/common/EmptyState/EmptyState";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export default function MyTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const team = useSelector((state) => state.favorites.team);

  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const fromIndex = team.findIndex((p) => p.id === draggedId);
    const toIndex = team.findIndex((p) => p.id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    let updatedTeam = [...team];
    [updatedTeam[fromIndex], updatedTeam[toIndex]] = [
      updatedTeam[toIndex],
      updatedTeam[fromIndex],
    ];

    dispatch(reorderTeam(updatedTeam));
    setDraggedId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <TeamPage>
      <HeaderSection>
        <h1>Mi Equipo Pokémon</h1>
        <p>
          Arrastra y suelta las tarjetas para reordenar tu alineación (Límite:
          6)
        </p>
        <TeamCounter $isFull={team.length === 6}>
          {team.length} / 6 Integrantes{" "}
          {team.length === 6 && "⚡ (Equipo Completo)"}
        </TeamCounter>
      </HeaderSection>

      {team.length === 0 ? (
        <EmptyState
          title="Tu equipo está vacío"
          description="Explora el catálogo general y agrega hasta 6 Pokémon favoritos a tu alineación."
          actionLabel="Ir al Catálogo"
          onAction={() => navigate("/")}
        />
      ) : (
        <TeamGrid>
          {team.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.id}
              pokemonId={pokemon.id}
              pokemonBasicName={pokemon.name}
              pokemonSprite={pokemon.sprite}
              pokemonTypes={pokemon.types}
              position={index + 1}
              draggable
              isDragging={draggedId === pokemon.id}
              onDragStart={(e) => handleDragStart(e, pokemon.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pokemon.id)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </TeamGrid>
      )}
    </TeamPage>
  );
}
