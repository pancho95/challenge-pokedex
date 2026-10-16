import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToTeam: (state, action) => {
      const pokemon = action.payload;
      const exists = state.team.some((p) => p.id === pokemon.id);

      if (!exists && state.team.length < 6) {
        state.team.push(pokemon);
      }
    },

    removeFromTeam: (state, action) => {
      const pokemonId = action.payload;
      state.team = state.team.filter((p) => p.id !== pokemonId);
    },

    reorderTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { addToTeam, removeFromTeam, reorderTeam } = pokemonSlice.actions;

export default pokemonSlice.reducer;
