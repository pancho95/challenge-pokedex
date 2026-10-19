import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState/EmptyState";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "48px 16px" }}>
      <EmptyState
        title="404 - Página no encontrada"
        description="La página que buscás no existe o fue movida."
        actionLabel="Volver al catálogo"
        onAction={() => navigate("/")}
      />
    </div>
  );
}
