import styled from "styled-components";

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr auto;
  gap: 12px;
  max-width: 1000px;
  margin: 0 auto 24px auto;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: #fff;
  transition: border-color 0.2s;
  color: #252936;
  box-sizing: border-box;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
  }
`;

export const SelectGroup = styled.div`
  display: contents;
`;

export const OptionFilter = styled.option`
  color: black;
`;

export const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 0.95rem;
  background: #fff;
  color: #252936;
  outline: none;
  cursor: pointer;
  text-transform: capitalize;
  box-sizing: border-box;

  &:focus {
    border-color: #4caf50;
  }
`;

export const ClearButton = styled.button`
  height: 44px;
  padding: 0 16px;
  border: 1px solid #ff4d4d;
  border-radius: 10px;
  background: #fff;
  color: #ff4d4d;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: 0.2s;

  &:hover {
    background: #ff4d4d;
    color: #fff;
  }
`;
