import styled from "styled-components";

export const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns = 4 }) => columns},
    minmax(0, 1fr)
  );
  gap: ${({ gap = "16px" }) => gap};
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
