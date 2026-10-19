import * as Yup from "yup";

const normalize = (v) => v?.trim().toLowerCase();

export const createCompareSchema = (validNames) => {
  const isValidPokemon = (val) => validNames.includes(normalize(val));

  return Yup.object().shape({
    pokemon1: Yup.string()
      .required("Debes seleccionar el primer Pokémon")
      .test(
        "is-valid-pokemon",
        "Selecciona un Pokémon válido de la lista",
        isValidPokemon,
      ),
    pokemon2: Yup.string()
      .required("Debes seleccionar el segundo Pokémon")
      .test(
        "is-valid-pokemon",
        "Selecciona un Pokémon válido de la lista",
        isValidPokemon,
      )
      .test(
        "not-same-pokemon",
        "No puedes comparar el mismo Pokémon",
        function (val) {
          return normalize(val) !== normalize(this.parent.pokemon1);
        },
      ),
  });
};
