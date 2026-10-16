import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToTeam, removeFromTeam } from "../../features/pokemon/pokemonSlice";

export default function PokemonCard({ pokemonBasicName, pokemonUrl }) {
  const extractIdFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const pokemonId = extractIdFromUrl(pokemonUrl);

  if (!pokemonId) return null;

  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const dispatch = useDispatch();
  const team = useSelector((state) => state.favorites.team);

  const isFavorite = team.some((p) => p.id === Number(pokemonId));

  const handleToggleTeam = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromTeam(Number(pokemonId)));
    } else {
      if (team.length >= 6) {
        alert(
          "¡Tu equipo ya tiene 6 Pokémon! Debes liberar uno antes de agregar otro.",
        );
        return;
      }

      dispatch(
        addToTeam({
          id: Number(pokemonId),
          name: pokemonBasicName,
          sprite: sprite,
          types: [],
        }),
      );
    }
  };

  return (
    <div className="pokemon-card-wrapper" style={{ position: "relative" }}>
      <button
        onClick={handleToggleTeam}
        title={isFavorite ? "Remover de mi equipo" : "Agregar a mi equipo"}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: isFavorite ? "#ff4d4d" : "#fff",
          color: isFavorite ? "#fff" : "#333",
          border: "1px solid #ccc",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <Link
        to={`/pokemon/${pokemonId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            background: "#fff",
          }}
        >
          <span style={{ color: "#888", fontSize: "0.9rem" }}>
            #{String(pokemonId).padStart(3, "0")}
          </span>
          <div>
            <img
              src={sprite}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultSprite;
              }}
              alt={pokemonBasicName}
              style={{ width: "96px", height: "96px", objectFit: "contain" }}
              loading="lazy"
            />
          </div>
          <h3 style={{ textTransform: "capitalize", margin: "8px 0" }}>
            {pokemonBasicName}
          </h3>
        </div>
      </Link>
    </div>
  );
}
