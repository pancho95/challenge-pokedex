import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
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

const Logo = styled(Link)`
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

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledNavLink = styled(NavLink)`
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

function Navbar() {
  return (
    <NavbarContainer>
      <Logo to="/">
        ⚡ Poké<span>Dex</span>
      </Logo>

      <NavLinks>
        <StyledNavLink to="/" end>
          🏠 Catálogo
        </StyledNavLink>

        <StyledNavLink to="/team">⭐ Mi Equipo</StyledNavLink>

        <StyledNavLink to="/compare">⚔️ Comparar</StyledNavLink>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
