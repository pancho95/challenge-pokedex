import { useState, useEffect } from "react";

import {
  NavbarContainer,
  Logo,
  NavLinks,
  StyledNavLink,
  StatusBadge,
} from "./Navbar.styles";

function Navbar() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

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

        {/* Indicador de Estado de Conexión */}
        <StatusBadge
          $isOnline={isOnline}
          title={
            isOnline
              ? "Conectado a la red"
              : "Sin conexión - Usando caché offline"
          }
        >
          <span className="dot" />
          {isOnline ? "Online" : "Offline"}
        </StatusBadge>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
