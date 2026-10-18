import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TYPE_COLORS } from "../../utils/pokemonColors";
import { GENERATIONS } from "../../utils/pokemonGenerations";
import {
  FilterContainer,
  OptionFilter,
  SearchInput,
  Select,
  SelectGroup,
  ClearButton,
} from "./Search.styles";

export default function SearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const selectedType = searchParams.get("type") || "";
  const selectedGen = searchParams.get("gen") || "";

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (searchTerm.trim()) {
          newParams.set("search", searchTerm.trim().toLowerCase());
        } else {
          newParams.delete("search");
        }
        return newParams;
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, setSearchParams]);

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (val) newParams.set("type", val);
      else newParams.delete("type");
      return newParams;
    });
  };

  const handleGenChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (val) newParams.set("gen", val);
      else newParams.delete("gen");
      return newParams;
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <FilterContainer>
      <SearchInput
        type="text"
        id="searchPokemon"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <SelectGroup>
        <Select
          id="pokemonColor"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <OptionFilter value="">Todos los tipos</OptionFilter>
          {Object.keys(TYPE_COLORS).map((type) => (
            <OptionFilter key={type} value={type}>
              {type.toUpperCase()}
            </OptionFilter>
          ))}
        </Select>

        <Select
          id="pokemonGeneration"
          value={selectedGen}
          onChange={handleGenChange}
        >
          <option value="">Todas las generaciones</option>
          {GENERATIONS.map((gen) => (
            <option key={gen.id} value={gen.id}>
              {gen.name}
            </option>
          ))}
        </Select>

        {(searchTerm || selectedType || selectedGen) && (
          <ClearButton onClick={handleClearFilters}>
            Limpiar filtros
          </ClearButton>
        )}
      </SelectGroup>
    </FilterContainer>
  );
}
