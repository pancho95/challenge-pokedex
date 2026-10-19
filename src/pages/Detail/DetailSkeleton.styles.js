import styled from "styled-components";
import { SkeletonBase } from "../../components/PokemonCardSkeleton/PokemonCardSkeleton.styles";

export const Block = styled(SkeletonBase)`
  width: ${({ $w }) => $w || "100%"};
  height: ${({ $h }) => $h || "16px"};
  border-radius: ${({ $r }) => $r || "8px"};
  margin: ${({ $m }) => $m || "0"};
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
`;
