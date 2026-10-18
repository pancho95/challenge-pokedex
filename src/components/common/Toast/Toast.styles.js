import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const shrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

export const ToastContainer = styled.aside`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: #1e293b;
  color: #ffffff;
  padding: 14px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 280px;
  max-width: 400px;
  animation: ${slideIn} 0.3s ease-out forwards;
  overflow: hidden;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: ${(props) => (props.$isError ? "#ef4444" : "#4caf50")};
  animation: ${shrink} 5s linear forwards;
`;
