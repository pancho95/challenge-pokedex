import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem 2.5rem;
  background: #1f2937;
  border-bottom: 3px solid #facc15;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const Logo = styled(Link)`
  color: #facc15;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: 1px;
  white-space: nowrap;

  span {
    color: #ffffff;
  }

  &:hover {
    transform: scale(1.04);
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    color: #111827;
    background: #facc15;
    transform: translateY(-2px);
  }

  &.active {
    color: #111827;
    background: #facc15;
    box-shadow: 0 2px 8px rgba(250, 204, 21, 0.25);
  }

  @media (max-width: 600px) {
    padding: 0.6rem 0.7rem;
    font-size: 0.85rem;
  }
`;

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) =>
    props.$isOnline ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$isOnline ? "#22c55e" : "#ef4444")};
  border: 1px solid
    ${(props) =>
      props.$isOnline ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"};

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => (props.$isOnline ? "#22c55e" : "#ef4444")};
    box-shadow: 0 0 8px ${(props) => (props.$isOnline ? "#22c55e" : "#ef4444")};
  }
`;
