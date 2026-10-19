import { useState } from "react";
import { useFormik } from "formik";
import { usePokemonFilter } from "../../hooks/usePokemonFilter";
import { useGetPokemonDetailQuery } from "../../services/pokemonDetailApi";
import {
  ComparePage,
  HeaderSection,
  FormCard,
  SelectorsGrid,
  FormGroup,
  ErrorText,
  SubmitButton,
  ComparisonContainer,
  PokemonOverviewGrid,
  StatBarGroup,
  StatFill,
} from "./Compare.styles";
import {
  SpinnerWrapper,
  PokeballIcon,
} from "../../components/common/PokeballSpinner.styles";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { createCompareSchema } from "../../utils/compareSchema";
import { getSprites } from "../../utils/pokemonSprites";

const STAT_LABELS = {
  hp: "PS (HP)",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

export default function Compare() {
  const [activeQuery1, setActiveQuery1] = useState("");
  const [activeQuery2, setActiveQuery2] = useState("");

  const { pokemons: pokemonList } = usePokemonFilter();

  const options = pokemonList || [];
  const validNames = options.map((p) => p.name.toLowerCase());

  const { data: res1, isFetching: loading1 } = useGetPokemonDetailQuery(
    activeQuery1,
    {
      skip: !activeQuery1,
    },
  );

  const { data: res2, isFetching: loading2 } = useGetPokemonDetailQuery(
    activeQuery2,
    {
      skip: !activeQuery2,
    },
  );

  const isLoadingDetails =
    (Boolean(activeQuery1) && loading1) || (Boolean(activeQuery2) && loading2);

  const CompareSchema = createCompareSchema(validNames);

  const formik = useFormik({
    initialValues: {
      pokemon1: "",
      pokemon2: "",
    },
    validationSchema: CompareSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setActiveQuery1(values.pokemon1.trim().toLowerCase());
      setActiveQuery2(values.pokemon2.trim().toLowerCase());
    },
  });

  const toCompareData = (res) => ({
    id: res.id,
    name: res.name,
    sprite: getSprites(res.sprites).artwork,
    types: res.types.map((t) => t.type.name),
    stats: res.stats.reduce(
      (acc, s) => ({ ...acc, [s.stat.name]: s.base_stat }),
      {},
    ),
  });

  const comparedData =
    res1 && res2 ? { p1: toCompareData(res1), p2: toCompareData(res2) } : null;

  return (
    <ComparePage>
      <HeaderSection>
        <h1>Comparador de Pokémon</h1>
        <p>
          Selecciona dos Pokémon para analizar y comparar sus estadísticas de
          combate
        </p>
      </HeaderSection>

      <FormCard onSubmit={formik.handleSubmit}>
        <SelectorsGrid>
          <FormGroup
            $hasError={
              formik.touched.pokemon1 && Boolean(formik.errors.pokemon1)
            }
          >
            <label htmlFor="pokemon1">Primer Pokémon</label>
            <input
              list="pokemon-list-1"
              id="pokemon1"
              name="pokemon1"
              placeholder="Escribe un Pokémon..."
              value={formik.values.pokemon1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <datalist id="pokemon-list-1">
              {options.map((p) => (
                <option key={`p1-${p.name}`} value={p.name} />
              ))}
            </datalist>
            {formik.touched.pokemon1 && formik.errors.pokemon1 && (
              <ErrorText>{formik.errors.pokemon1}</ErrorText>
            )}
          </FormGroup>

          <FormGroup
            $hasError={
              formik.touched.pokemon2 && Boolean(formik.errors.pokemon2)
            }
          >
            <label htmlFor="pokemon2">Segundo Pokémon</label>
            <input
              list="pokemon-list-2"
              id="pokemon2"
              name="pokemon2"
              placeholder="Escribe un Pokémon..."
              value={formik.values.pokemon2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <datalist id="pokemon-list-2">
              {options.map((p) => (
                <option key={`p2-${p.name}`} value={p.name} />
              ))}
            </datalist>
            {formik.touched.pokemon2 && formik.errors.pokemon2 && (
              <ErrorText>{formik.errors.pokemon2}</ErrorText>
            )}
          </FormGroup>
        </SelectorsGrid>

        <SubmitButton
          type="submit"
          disabled={!formik.isValid || isLoadingDetails}
        >
          {isLoadingDetails ? "Cargando datos..." : "Comparar Estadísticas"}
        </SubmitButton>
      </FormCard>

      {isLoadingDetails && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <SpinnerWrapper>
            <PokeballIcon />
            <span>Obteniendo estadísticas...</span>
          </SpinnerWrapper>
        </div>
      )}

      {comparedData && !isLoadingDetails && (
        <ComparisonContainer>
          <PokemonOverviewGrid>
            <PokemonCard
              key={comparedData.p1.id}
              pokemonId={comparedData.p1.id}
              pokemonBasicName={comparedData.p1.name}
              pokemonSprite={comparedData.p1.sprite}
              pokemonTypes={comparedData.p1.types}
            />
            <PokemonCard
              key={comparedData.p2.id}
              pokemonId={comparedData.p2.id}
              pokemonBasicName={comparedData.p2.name}
              pokemonSprite={comparedData.p2.sprite}
              pokemonTypes={comparedData.p2.types}
            />
          </PokemonOverviewGrid>

          <div
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
              Estadísticas Base
            </h2>

            {Object.keys(STAT_LABELS).map((statKey) => {
              const val1 = comparedData.p1.stats[statKey] || 0;
              const val2 = comparedData.p2.stats[statKey] || 0;

              return (
                <StatBarGroup key={statKey}>
                  <div className="stat-header">
                    <span
                      style={{ color: val1 >= val2 ? "#4caf50" : "#252936" }}
                    >
                      {comparedData.p1.name}: {val1}
                    </span>
                    <span>{STAT_LABELS[statKey]}</span>
                    <span
                      style={{ color: val2 >= val1 ? "#4caf50" : "#252936" }}
                    >
                      {comparedData.p2.name}: {val2}
                    </span>
                  </div>

                  <div className="stat-track">
                    <StatFill
                      $percentage={(val1 / (val1 + val2 || 1)) * 100}
                      $color={val1 >= val2 ? "#4caf50" : "#9ca3af"}
                    />
                    <StatFill
                      $percentage={(val2 / (val1 + val2 || 1)) * 100}
                      $color={val2 >= val1 ? "#3b82f6" : "#cbd5e1"}
                    />
                  </div>
                </StatBarGroup>
              );
            })}
          </div>
        </ComparisonContainer>
      )}
    </ComparePage>
  );
}
