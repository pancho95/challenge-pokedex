import styled from "styled-components";

export const ComparePage = styled.main`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
  box-sizing: border-box;
  color: #252936;
`;

export const HeaderSection = styled.header`
  text-align: center;
  margin-bottom: 32px;

  h1 {
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
    margin: 0 0 8px 0;
  }

  p {
    color: #777e8d;
    font-size: 15px;
    margin: 0;
  }
`;

export const FormCard = styled.form`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
`;

export const SelectorsGrid = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 700;
    color: #343a48;
  }

  input,
  select {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;

    @media (max-width: 768px) {
      padding: 6px 8px;
    }

    &:focus {
      border-color: ${(props) => (props.$hasError ? "#ef4444" : "#4caf50")};
    }
  }
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #4caf50;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;

  &:hover {
    background: #43a047;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

export const ComparisonContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const PokemonOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);

  img {
    width: 140px;
    height: 140px;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  h3 {
    margin: 12px 0 4px 0;
    text-transform: capitalize;
    font-size: 22px;
  }
`;

export const StatBarGroup = styled.div`
  margin-bottom: 16px;

  .stat-header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .stat-track {
    height: 12px;
    background: #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
  }
`;

export const StatFill = styled.div`
  height: 100%;
  background-color: ${(props) => props.$color || "#4caf50"};
  width: ${(props) => props.$percentage}%;
  transition: width 0.4s ease-out;
`;
