import styled, { keyframes } from "styled-components";

const pokemonAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const detailSpin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const DetailPage = styled.main`
  --pokemon-color: ${(props) => props.$accent || "#4caf50"};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
  font-family: inherit;
  color: #252936;

  @media (max-width: 650px) {
    padding: 10px;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-bottom: ${(props) => (props.$inStatus ? "0" : "18px")};
  padding: 11px 18px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #252936 !important;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.2s;

  &:hover {
    background: #252936;
    color: #ffffff !important;
    border-color: #252936;
    transform: translateX(-2px);
  }

  &:focus-visible {
    outline: 3px solid var(--pokemon-color);
    outline-offset: 3px;
  }
`;

export const DetailCard = styled.article`
  overflow: hidden;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);

  @media (max-width: 650px) {
    padding: 16px;
    border-radius: 14px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const PokemonNumber = styled.span`
  color: #777e8d;
  font-size: 20px;
  font-weight: 800;
`;

export const TeamButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${(props) => (props.$isFavorite ? "#252936" : "#d1d5db")};
  border-radius: 24px;
  background: ${(props) => (props.$isFavorite ? "#252936" : "#fff")};
  color: ${(props) => (props.$isFavorite ? "#fff" : "#252936")};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #252936;
    color: ${(props) => (props.$isFavorite ? "#fff" : "#252936")};
  }

  &:focus-visible {
    outline: 3px solid var(#252936);
    outline-offset: 3px;
  }

  > span {
    font-size: 18px;
  }

  @media (max-width: 650px) {
    padding: 9px 11px;
    font-size: 12px;
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 0 26px;
  text-align: center;
`;

export const ImageStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(100%, 340px);
  height: 280px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--pokemon-color) 18%, white) 0%,
    white 70%
  );

  @media (max-width: 650px) {
    height: 230px;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.12));
  animation: ${pokemonAppear} 0.35s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PokemonName = styled.h1`
  margin: 8px 0 2px;
  color: #252936;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  text-transform: capitalize;
`;

export const PokemonSubtitle = styled.p`
  margin: 0 0 14px;
  color: #858b98;
  font-size: 13px;
`;

export const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
`;

export const TypeBadge = styled.span`
  padding: 8px 19px;
  border-radius: 24px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  background-color: ${(props) => props.$bgColor};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
`;

export const Section = styled.section`
  margin-top: 26px;

  h2 {
    margin: 0;
    color: #343a48;
    font-size: 19px;
    font-weight: 800;
  }
`;

export const SpriteGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 650px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SpriteOption = styled.button`
  display: flex;
  flex: 1 1 110px;
  max-width: 150px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border: 1px solid
    ${(props) => (props.$isSelected ? "var(--pokemon-color)" : "#e5e7eb")};
  border-radius: 12px;
  background: ${(props) =>
    props.$isSelected
      ? "color-mix(in srgb, var(--pokemon-color) 10%, white)"
      : "#fafafa"};
  color: ${(props) => (props.$isSelected ? "#252936" : "#555d6d")};
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;

  img {
    width: 76px;
    height: 76px;
    object-fit: contain;
  }

  &:hover {
    border-color: var(--pokemon-color);
    background: color-mix(in srgb, var(--pokemon-color) 10%, white);
    color: #252936;
  }

  &:focus-visible {
    outline: 3px solid var(--pokemon-color);
    outline-offset: 3px;
  }

  @media (max-width: 650px) {
    max-width: none;
  }
`;

export const PhysicalInfoGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 22px;
  padding: 20px;
  border-radius: 14px;
  background: #f7f8fa;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 16px;
  }
`;

export const PhysicalItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  strong {
    color: #252936;
    font-size: 17px;
  }

  @media (max-width: 650px) {
    justify-content: flex-start;
  }
`;

export const InfoIcon = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--pokemon-color) 14%, white);
  color: var(--pokemon-color);
  font-size: 22px;
`;

export const InfoLabel = styled.span`
  color: #777e8d;
  font-size: 12px;
`;

export const AbilitiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

export const AbilityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fafafa;
  color: #343a48;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const HiddenBadge = styled.span`
  padding: 3px 6px;
  border-radius: 5px;
  background: #ece7ff;
  color: #6741b5;
  font-size: 10px;
  text-transform: uppercase;
`;

export const StatsSection = styled(Section)`
  padding-top: 24px;
  border-top: 1px solid #eceef2;
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;

  p {
    margin: 6px 0 0;
    color: #858b98;
    font-size: 13px;
  }

  @media (max-width: 650px) {
    align-items: flex-start;
  }
`;

export const StatsTotal = styled.span`
  flex-shrink: 0;
  color: var(--pokemon-color);
  font-size: 24px;
  font-weight: 800;
  text-align: right;

  small {
    display: block;
    margin-top: 2px;
    color: #858b98;
    font-size: 10px;
    letter-spacing: 1px;
  }
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export const StatRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const StatLabels = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #737b8b;
  font-size: 13px;

  strong {
    color: #343a48;
    font-size: 14px;
  }
`;

export const StatTrack = styled.div`
  overflow: hidden;
  width: 100%;
  height: 9px;
  border-radius: 20px;
  background: #eceef2;
`;

export const StatFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: var(--pokemon-color);
  width: ${(props) => props.$fillPercentage}%;
  transition: width 0.5s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 250px;
  padding: 30px;
  color: #343a48;
  text-align: center;
`;

export const Loader = styled.span`
  width: 32px;
  height: 32px;
  border: 4px solid #e5e7eb;
  border-top-color: #4caf50;
  border-radius: 50%;
  animation: ${detailSpin} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
