export const getSprites = (raw = {}) => ({
  artwork:
    raw.officialArtwork ??
    raw.other?.["official-artwork"]?.front_default ??
    raw.front ??
    raw.front_default ??
    null,
  front: raw.front ?? raw.front_default ?? null,
  back: raw.back ?? raw.back_default ?? null,
  shiny: raw.frontShiny ?? raw.front_shiny ?? null,
  shinyBack: raw.backShiny ?? raw.back_shiny ?? null,
});
