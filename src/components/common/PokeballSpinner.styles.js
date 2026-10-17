import styled, { keyframes } from "styled-components";

const spinAndPulse = keyframes`
  0% {
    transform: rotate(0deg) scale(0.95);
  }
  50% {
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(0.95);
  }
`;

export const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  color: #888;
  font-size: 0.95rem;
  font-weight: 600;
`;

export const PokeballIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid #252936;
  position: relative;
  background: linear-gradient(180deg, #ff4d4d 0% 50%, #ffffff 50% 100%);
  box-shadow: 0 0 10px rgba(255, 77, 77, 0.3);
  animation: ${spinAndPulse} 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;

  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 1.5px);
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #252936;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #ffffff;
    border: 2.5px solid #252936;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  }
`;
