import { describe, it, expect } from "vitest";
import reducer, {
  addToTeam,
  removeFromTeam,
  reorderTeam,
} from "./pokemonSlice";

const makePokemon = (id) => ({ id, name: `pokemon-${id}` });

const stateWith = (count) => ({
  team: Array.from({ length: count }, (_, i) => makePokemon(i + 1)),
});

describe("pokemonSlice", () => {
  it("arranca con el equipo vacío", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual({ team: [] });
  });

  describe("addToTeam", () => {
    it("agrega un pokémon al equipo", () => {
      const state = reducer({ team: [] }, addToTeam(makePokemon(25)));
      expect(state.team).toEqual([makePokemon(25)]);
    });

    it("no agrega duplicados", () => {
      const initial = { team: [makePokemon(25)] };
      const state = reducer(initial, addToTeam(makePokemon(25)));
      expect(state.team).toHaveLength(1);
    });

    it("no permite más de 6 pokémon", () => {
      const state = reducer(stateWith(6), addToTeam(makePokemon(99)));
      expect(state.team).toHaveLength(6);
      expect(state.team.some((p) => p.id === 99)).toBe(false);
    });

    it("permite llegar justo a 6", () => {
      const state = reducer(stateWith(5), addToTeam(makePokemon(99)));
      expect(state.team).toHaveLength(6);
    });
  });

  describe("removeFromTeam", () => {
    it("elimina solo el pokémon indicado por id", () => {
      const state = reducer(stateWith(3), removeFromTeam(2));
      expect(state.team.map((p) => p.id)).toEqual([1, 3]);
    });

    it("no hace nada si el id no está en el equipo", () => {
      const state = reducer(stateWith(3), removeFromTeam(999));
      expect(state.team).toHaveLength(3);
    });
  });

  describe("reorderTeam", () => {
    it("reemplaza el orden del equipo", () => {
      const reordered = [makePokemon(3), makePokemon(1), makePokemon(2)];
      const state = reducer(stateWith(3), reorderTeam(reordered));
      expect(state.team.map((p) => p.id)).toEqual([3, 1, 2]);
    });
  });
});
