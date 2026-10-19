import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 15px 20px;
  text-align: center;

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

export const ActionButton = styled.button`
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
