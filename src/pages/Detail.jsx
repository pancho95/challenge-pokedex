import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonDetailQuery } from "../services/pokemonDetailApi";
import { addToTeam, removeFromTeam } from "../features/pokemon/pokemonSlice";

export default function Detail() {
  const { idPokemon } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetPokemonDetailQuery(idPokemon, {
    skip: !idPokemon,
  });

  const dispatch = useDispatch();
  const team = useSelector((state) => state.favorites.team);

  if (!idPokemon || isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Cargando detalles del Pokémon...
      </div>
    );
  if (error || !pokemon)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        No se pudo encontrar el Pokémon.
      </div>
    );

  const pokemonId = pokemon.id;
  const isFavorite = team.some((p) => p.id === pokemonId);
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  const handleToggleTeam = () => {
    if (isFavorite) {
      dispatch(removeFromTeam(pokemonId));
    } else {
      if (team.length >= 6) {
        alert(
          "¡Tu equipo ya tiene 6 Pokémon! Debes liberar uno antes de agregar otro.",
        );
        return;
      }
      dispatch(
        addToTeam({
          id: pokemon.id,
          name: pokemon.name,
          sprite: sprite,
          types: pokemon.types.map((t) => t.type.name),
        }),
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        fontFamily: "sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #ccc",
          background: "#f9f9f9",
        }}
      >
        ← Volver
      </button>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "24px",
          textAlign: "center",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ color: "#888", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            #{String(pokemonId).padStart(3, "0")}
          </span>
          <button
            onClick={handleToggleTeam}
            style={{
              background: isFavorite ? "#ff4d4d" : "#fff",
              color: isFavorite ? "#fff" : "#333",
              border: "1px solid #ccc",
              borderRadius: "20px",
              padding: "6px 14px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {isFavorite ? "❤️ En mi equipo" : "🤍 Agregar a mi equipo"}
          </button>
        </div>

        <div style={{ margin: "20px 0" }}>
          <img
            src={sprite}
            alt={pokemon.name}
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
        </div>

        <h1
          style={{
            textTransform: "capitalize",
            margin: "10px 0",
            fontSize: "2rem",
          }}
        >
          {pokemon.name}
        </h1>

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                background: "#e0e0e0",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#f7f7f7",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </div>
          <div>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </div>
        </div>

        <div style={{ textAlign: "left" }}>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
            Estadísticas Base
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {pokemon.stats.map((s) => (
              <li
                key={s.stat.name}
                style={{
                  margin: "8px 0",
                  textTransform: "capitalize",
                  fontSize: "0.95rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span>{s.stat.name.replace("-", " ")}</span>
                  <strong>{s.base_stat}</strong>
                </div>
                <div
                  style={{
                    background: "#eee",
                    borderRadius: "4px",
                    height: "8px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "#4caf50",
                      width: `${Math.min(s.base_stat, 100)}%`,
                      height: "100%",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
