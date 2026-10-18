import styled from "styled-components";

export const SyncStatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.$isFetching ? "rgba(59, 130, 246, 0.1)" : "rgba(16, 185, 129, 0.1)"};
  color: ${(props) => (props.$isFetching ? "#3b82f6" : "#10b981")};
  margin-bottom: 12px;

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isFetching ? "#3b82f6" : "#10b981")};
    animation: ${(props) =>
      props.$isFetching ? "pulse 1.5s infinite" : "none"};
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.3);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }
`;
