import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToTeam: (state, action) => {
      const exists = state.team.some((p) => p.id === action.payload.id);
      if (!exists && state.team.length < 6) {
        state.team.push(action.payload);
      }
    },
    removeFromTeam: (state, action) => {
      state.team = state.team.filter((p) => p.id !== action.payload);
    },
    reorderTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { addToTeam, removeFromTeam, reorderTeam } = pokemonSlice.actions;
export default pokemonSlice.reducer;
