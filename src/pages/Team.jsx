import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromTeam, reorderTeam } from "../features/pokemon/pokemonSlice";
import { TYPE_COLORS, TYPE_NAMES } from "../utils/pokemonColors";
import {
  TeamPage,
  HeaderSection,
  TeamCounter,
  EmptyState,
  PrimaryButton,
  TeamGrid,
  TeamMemberCard,
  RemoveButton,
  MemberImage,
  MemberName,
  MemberNumber,
  TypesContainer,
  TypeBadge,
} from "./Team.styles";

export default function MyTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const team = useSelector((state) => state.favorites.team);

  const [draggedId, setDraggedId] = useState(null);

  const handleRemove = (id) => {
    dispatch(removeFromTeam(id));
  };

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
        <EmptyState>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokébola vacía"
          />
          <h2>Tu equipo está vacío</h2>
          <p>
            Explora el catálogo general y agrega hasta 6 Pokémon favoritos a tu
            alineación.
          </p>
          <PrimaryButton onClick={() => navigate("/")}>
            Ir al Catálogo
          </PrimaryButton>
        </EmptyState>
      ) : (
        <TeamGrid>
          {team.map((pokemon, index) => (
            <TeamMemberCard
              key={pokemon.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pokemon.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pokemon.id)}
              onDragEnd={handleDragEnd}
              style={{
                cursor: "grab",
                opacity: draggedId === pokemon.id ? 0.4 : 1,
                border:
                  draggedId === pokemon.id ? "2px dashed #4caf50" : undefined,
              }}
            >
              <RemoveButton
                onClick={() => handleRemove(pokemon.id)}
                title="Quitar del equipo"
                aria-label="Quitar del equipo"
              >
                ✕
              </RemoveButton>

              <MemberImage
                src={pokemon.sprite}
                alt={pokemon.name}
                onClick={() => navigate(`/pokemon/${pokemon.id}`)}
              />

              <MemberNumber>
                N.° {String(pokemon.id).padStart(3, "0")} (Pos. {index + 1})
              </MemberNumber>

              <MemberName onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
                {pokemon.name}
              </MemberName>

              <TypesContainer>
                {pokemon.types?.map((type) => (
                  <TypeBadge
                    key={type}
                    $bgColor={TYPE_COLORS[type] || TYPE_COLORS.normal}
                  >
                    {TYPE_NAMES[type] || type}
                  </TypeBadge>
                ))}
              </TypesContainer>
            </TeamMemberCard>
          ))}
        </TeamGrid>
      )}
    </TeamPage>
  );
}
