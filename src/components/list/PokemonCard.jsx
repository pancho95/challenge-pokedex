import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToTeam, removeFromTeam } from "../../features/pokemon/pokemonSlice";
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
import Toast from "../common/Toast";

export default function PokemonCard({
  pokemonId,
  pokemonBasicName,
  pokemonSprite,
  pokemonTypes = [],
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [toastInfo, setToastInfo] = useState(null);

  if (!pokemonId) return null;

  const dispatch = useDispatch();
  const team = useSelector((state) => state.favorites.team);
  const isFavorite = team.some((p) => p.id === Number(pokemonId));

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
        types: pokemonTypes,
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
      <CardWrapper>
        <FavoriteButton
          onClick={handleToggleTeam}
          $isFavorite={isFavorite}
          title={isFavorite ? "Remover de mi equipo" : "Agregar a mi equipo"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </FavoriteButton>

        <Link
          to={`/pokemon/${pokemonId}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardLink>
            <PokemonNumber>#{String(pokemonId).padStart(3, "0")}</PokemonNumber>

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

            {pokemonTypes.length > 0 && (
              <TypesContainer>
                {pokemonTypes.map((typeName) => (
                  <TypeBadge key={typeName} $typeName={typeName}>
                    {typeName}
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
