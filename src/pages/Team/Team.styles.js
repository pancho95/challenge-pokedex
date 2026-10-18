import styled from "styled-components";

export const TeamPage = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
  box-sizing: border-box;
  color: #252936;
`;

export const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const TeamCounter = styled.span`
  display: inline-block;
  margin-top: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  background: #eceef2;
  color: #343a48;
  font-weight: 700;
  font-size: 14px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 15px 20px;
  text-align: center;

  img {
    width: 120px;
    height: 120px;
    opacity: 0.6;
    filter: grayscale(40%);
  }

  h2 {
    margin: 0;
    font-size: 22px;
    color: #343a48;
  }

  p {
    margin: 0;
    color: #777e8d;
    max-width: 400px;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  background: #4caf50;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s;

  &:hover {
    background: #43a047;
    transform: translateY(-2px);
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;
