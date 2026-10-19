import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useGetPokemonDetailQuery } from "../../services/pokemonDetailApi";
import { addToTeam, removeFromTeam } from "../../features/pokemon/pokemonSlice";
import { TYPE_COLORS, TYPE_NAMES } from "../../utils/pokemonColors";
import {
  CardWrapper,
  FavoriteButton,
  CardLink,
  PokemonNumber,
  ImageContainer,
  Spinner,
  PokemonImage,
  PokemonName,
  TypesContainer,
  TypeBadge,
} from "./PokemonCard.styles";
import Toast from "../common/Toast/Toast";

export default function PokemonCard({
  pokemonId,
  pokemonBasicName,
  pokemonSprite,
  pokemonTypes = [],
  position,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  style = {},
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [toastInfo, setToastInfo] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const team = useSelector((state) => state.favorites.team);

  const { data: detail } = useGetPokemonDetailQuery(pokemonId, {
    skip: !pokemonId || (pokemonTypes && pokemonTypes.length > 0),
  });
  const resolvedTypes =
    pokemonTypes && pokemonTypes.length > 0
      ? pokemonTypes
      : detail?.types?.map((t) => t.type.name) || [];

  const isFavorite = team.some((p) => p.id === Number(pokemonId));

  if (!pokemonId) return null;

  const handleToggleTeam = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromTeam(Number(pokemonId)));
      setToastInfo({
        message: `${pokemonBasicName} ha sido eliminado de tu equipo.`,
        type: "success",
      });
      return;
    }

    if (team.length >= 6) {
      setToastInfo({
        message:
          "¡Tu equipo ya tiene 6 Pokémon! Debes liberar uno antes de agregar otro.",
        type: "error",
      });
      return;
    }

    dispatch(
      addToTeam({
        id: Number(pokemonId),
        name: pokemonBasicName,
        sprite: pokemonSprite,
        types: resolvedTypes,
      }),
    );
    setToastInfo({
      message: `¡${pokemonBasicName} se unió a tu equipo!`,
      type: "success",
    });
  };

  return (
    <>
      {toastInfo && (
        <Toast
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={() => setToastInfo(null)}
        />
      )}
      <CardWrapper
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        style={{
          ...style,
          opacity: isDragging ? 0.4 : (style.opacity ?? 1),
          border: isDragging ? "2px dashed #4caf50" : style.border,
          cursor: draggable ? "grab" : "pointer",
        }}
      >
        <FavoriteButton
          onClick={handleToggleTeam}
          $isFavorite={isFavorite}
          title={isFavorite ? "Remover de mi equipo" : "Agregar a mi equipo"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </FavoriteButton>

        <Link
          to={`/pokemon/${pokemonId}`}
          state={{ from: location.pathname }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardLink>
            <PokemonNumber>
              #{String(pokemonId).padStart(3, "0")}
              {position !== undefined && ` (Pos. ${position})`}
            </PokemonNumber>

            <ImageContainer $imageLoaded={imageLoaded}>
              {!imageLoaded && <Spinner />}
              <PokemonImage
                src={pokemonSprite}
                onLoad={() => setImageLoaded(true)}
                alt={pokemonBasicName}
                $imageLoaded={imageLoaded}
                loading="lazy"
              />
            </ImageContainer>

            <PokemonName>{pokemonBasicName}</PokemonName>

            {resolvedTypes.length > 0 && (
              <TypesContainer>
                {resolvedTypes.map((typeName) => (
                  <TypeBadge
                    key={typeName}
                    $typeName={typeName}
                    $bgColor={TYPE_COLORS[typeName] || TYPE_COLORS.normal}
                  >
                    {TYPE_NAMES[typeName] || typeName}
                  </TypeBadge>
                ))}
              </TypesContainer>
            )}
          </CardLink>
        </Link>
      </CardWrapper>
    </>
  );
}
