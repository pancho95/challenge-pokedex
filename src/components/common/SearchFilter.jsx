import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { TYPE_COLORS } from "../../utils/pokemonColors";
import { GENERATIONS } from "../../utils/pokemonGenerations";

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

const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto 24px auto;
  padding: 0 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: #fff;
  transition: border-color 0.2s;
  color: #252936;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
  }
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const OptionFilter = styled.option`
  color: black;
`;

const Select = styled.select`
  flex: 1;
  min-width: 250px;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  background: #fff;
  color: #252936;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;

  &:focus {
    border-color: #4caf50;
  }
`;

const ClearButton = styled.button`
  padding: 10px 16px;
  border: 1px solid #ff4d4d;
  border-radius: 10px;
  background: #fff;
  color: #ff4d4d;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #ff4d4d;
    color: #fff;
  }
`;
