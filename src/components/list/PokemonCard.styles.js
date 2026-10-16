import styled, { keyframes } from "styled-components";
import { TYPE_COLORS } from "../../utils/pokemonColors";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${(props) => (props.$isFavorite ? "#ff4d4d" : "#fff")};
  color: ${(props) => (props.$isFavorite ? "#fff" : "#333")};
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const CardLink = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  background: #fff;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const PokemonNumber = styled.span`
  color: #888;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const ImageContainer = styled.div`
  width: 110px;
  height: 110px;
  margin: 10px auto;
  background: ${(props) => (props.$imageLoaded ? "transparent" : "#f0f0f0")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Spinner = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #ddd;
  border-top: 3px solid #666;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  opacity: ${(props) => (props.$imageLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const PokemonName = styled.h3`
  text-transform: capitalize;
  margin: 10px 0 6px 0;
  color: #333;
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
`;

export const TypeBadge = styled.span`
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: #fff;
  background-color: ${(props) => TYPE_COLORS[props.$typeName] || "#777"};
  text-transform: capitalize;
  font-weight: bold;
`;
