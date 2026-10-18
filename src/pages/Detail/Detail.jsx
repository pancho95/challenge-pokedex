import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonDetailQuery } from "../../services/pokemonDetailApi";
import { addToTeam, removeFromTeam } from "../../features/pokemon/pokemonSlice";
import {
  TYPE_COLORS,
  TYPE_NAMES,
  STAT_NAMES,
  SPRITE_NAMES,
} from "../../utils/pokemonColors";
import {
  DetailPage,
  BackButton,
  DetailCard,
  TopBar,
  PokemonNumber,
  TeamButton,
  HeroSection,
  ImageStage,
  MainImage,
  PokemonName,
  PokemonSubtitle,
  TypesContainer,
  TypeBadge,
  Section,
  SpriteGallery,
  SpriteOption,
  PhysicalInfoGrid,
  PhysicalItem,
  InfoIcon,
  InfoLabel,
  AbilitiesList,
  AbilityBadge,
  HiddenBadge,
  StatsSection,
  SectionHeading,
  StatsTotal,
  StatsList,
  StatRow,
  StatLabels,
  StatTrack,
  StatFill,
  StatusContainer,
  Loader,
} from "./Detail.styles";
import Toast from "../../components/common/Toast/Toast";

export default function Detail() {
  const { idPokemon, id } = useParams();
  const pokemonParam = idPokemon || id;

  const [toastInfo, setToastInfo] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const team = useSelector((state) => state.favorites.team);

  const [selectedSprite, setSelectedSprite] = useState("artwork");

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailQuery(pokemonParam, {
    skip: !pokemonParam,
  });

  if (!pokemonParam || isLoading) {
    return (
      <StatusContainer>
        <Loader />
        Cargando detalles del Pokémon...
      </StatusContainer>
    );
  }

  if (error || !pokemon) {
    return (
      <StatusContainer>
        <BackButton $inStatus onClick={() => navigate(-1)}>
          ← Volver al listado
        </BackButton>
        <p>No se pudo encontrar el Pokémon.</p>
      </StatusContainer>
    );
  }

  const pokemonId = pokemon.id;
  const isFavorite = team.some((p) => p.id === pokemonId);

  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const accent = TYPE_COLORS[primaryType] || TYPE_COLORS.normal;

  const sprites = {
    artwork:
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default,
    front: pokemon.sprites.front_default,
    back: pokemon.sprites.back_default,
    shiny: pokemon.sprites.front_shiny,
    shinyBack: pokemon.sprites.back_shiny,
  };

  const availableSprites = Object.entries(sprites).filter(([, url]) =>
    Boolean(url),
  );

  const activeSprite = sprites[selectedSprite] || sprites.artwork;

  const handleToggleTeam = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromTeam(Number(pokemonId)));
      setToastInfo({
        message: `${pokemon.name} ha sido eliminado de tu equipo.`,
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
        name: pokemon.name,
        sprite: pokemon.sprite,
        types: pokemon.types,
      }),
    );
    setToastInfo({
      message: `¡${pokemon.name} se unió a tu equipo!`,
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
      <DetailPage $accent={accent}>
        <BackButton onClick={() => navigate(-1)} type="button">
          <span aria-hidden="true">←</span> Volver al listado
        </BackButton>

        <DetailCard>
          <TopBar>
            <PokemonNumber>#{String(pokemonId).padStart(3, "0")}</PokemonNumber>

            <TeamButton
              $isFavorite={isFavorite}
              onClick={handleToggleTeam}
              type="button"
              aria-pressed={isFavorite}
            >
              <span>{isFavorite ? "❤️" : "🤍"}</span>
            </TeamButton>
          </TopBar>

          <HeroSection>
            <ImageStage>
              {activeSprite ? (
                <MainImage
                  src={activeSprite}
                  alt={`${pokemon.name} ${SPRITE_NAMES[selectedSprite] || ""}`}
                />
              ) : (
                <p>Imagen no disponible</p>
              )}
            </ImageStage>

            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonSubtitle>
              Pokémon #{String(pokemonId).padStart(3, "0")}
            </PokemonSubtitle>

            <TypesContainer>
              {pokemon.types.map(({ type }) => (
                <TypeBadge
                  key={type.name}
                  $bgColor={TYPE_COLORS[type.name] || TYPE_COLORS.normal}
                >
                  {TYPE_NAMES[type.name] || type.name}
                </TypeBadge>
              ))}
            </TypesContainer>
          </HeroSection>

          {availableSprites.length > 1 && (
            <Section>
              <h2>Galería de sprites</h2>
              <SpriteGallery>
                {availableSprites.map(([key, url]) => (
                  <SpriteOption
                    type="button"
                    $isSelected={selectedSprite === key}
                    key={key}
                    onClick={() => setSelectedSprite(key)}
                    aria-pressed={selectedSprite === key}
                    title={SPRITE_NAMES[key]}
                  >
                    <img src={url} alt="" />
                    <span>{SPRITE_NAMES[key]}</span>
                  </SpriteOption>
                ))}
              </SpriteGallery>
            </Section>
          )}

          <PhysicalInfoGrid>
            <PhysicalItem>
              <InfoIcon>↕</InfoIcon>
              <div>
                <InfoLabel>Altura</InfoLabel>
                <strong>{pokemon.height / 10} m</strong>
              </div>
            </PhysicalItem>

            <PhysicalItem>
              <InfoIcon>⚖</InfoIcon>
              <div>
                <InfoLabel>Peso</InfoLabel>
                <strong>{pokemon.weight / 10} kg</strong>
              </div>
            </PhysicalItem>

            <PhysicalItem>
              <InfoIcon>✦</InfoIcon>
              <div>
                <InfoLabel>Experiencia base</InfoLabel>
                <strong>{pokemon.base_experience ?? "—"} XP</strong>
              </div>
            </PhysicalItem>
          </PhysicalInfoGrid>

          <Section>
            <h2>Habilidades</h2>
            <AbilitiesList>
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <AbilityBadge key={ability.name}>
                  {ability.name.replaceAll("-", " ")}
                  {is_hidden && <HiddenBadge>Oculta</HiddenBadge>}
                </AbilityBadge>
              ))}
            </AbilitiesList>
          </Section>

          <StatsSection>
            <SectionHeading>
              <div>
                <h2>Estadísticas base</h2>
                <p>Distribución de atributos del Pokémon</p>
              </div>
              <StatsTotal>
                {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                <small> TOTAL</small>
              </StatsTotal>
            </SectionHeading>

            <StatsList>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <StatRow key={stat.name}>
                  <StatLabels>
                    <span>{STAT_NAMES[stat.name] || stat.name}</span>
                    <strong>{base_stat}</strong>
                  </StatLabels>

                  <StatTrack
                    role="progressbar"
                    aria-label={STAT_NAMES[stat.name] || stat.name}
                    aria-valuenow={base_stat}
                    aria-valuemin={0}
                    aria-valuemax={255}
                  >
                    <StatFill
                      $fillPercentage={Math.min((base_stat / 255) * 100, 100)}
                    />
                  </StatTrack>
                </StatRow>
              ))}
            </StatsList>
          </StatsSection>
        </DetailCard>
      </DetailPage>
    </>
  );
}
