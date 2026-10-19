import { describe, it, expect } from "vitest";
import { createCompareSchema } from "./compareSchema";

const schema = createCompareSchema(["pikachu", "charizard", "bulbasaur"]);

const MSG_SAME = "No puedes comparar el mismo Pokémon";
const MSG_INVALID = "Selecciona un Pokémon válido de la lista";

describe("compareSchema", () => {
  it("acepta dos pokémon válidos y distintos", async () => {
    await expect(
      schema.isValid({ pokemon1: "pikachu", pokemon2: "charizard" }),
    ).resolves.toBe(true);
  });

  it("falla si los campos están vacíos", async () => {
    await expect(schema.isValid({ pokemon1: "", pokemon2: "" })).resolves.toBe(
      false,
    );
    await expect(
      schema.validateAt("pokemon1", { pokemon1: "", pokemon2: "" }),
    ).rejects.toThrow("Debes seleccionar el primer Pokémon");
  });

  it("falla si el pokémon no está en la lista", async () => {
    await expect(
      schema.validateAt("pokemon1", { pokemon1: "missingno", pokemon2: "" }),
    ).rejects.toThrow(MSG_INVALID);
  });

  it("no permite comparar el mismo pokémon", async () => {
    await expect(
      schema.validateAt("pokemon2", {
        pokemon1: "pikachu",
        pokemon2: "pikachu",
      }),
    ).rejects.toThrow(MSG_SAME);
  });

  it("detecta el mismo pokémon aunque cambien mayúsculas o espacios", async () => {
    await expect(
      schema.validateAt("pokemon2", {
        pokemon1: "Pikachu",
        pokemon2: " pikachu ",
      }),
    ).rejects.toThrow(MSG_SAME);
  });

  it("acepta mayúsculas y espacios en un pokémon válido", async () => {
    await expect(
      schema.isValid({ pokemon1: " Pikachu ", pokemon2: "BULBASAUR" }),
    ).resolves.toBe(true);
  });
});
