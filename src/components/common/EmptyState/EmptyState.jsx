import PokeballEmpty from "./PokeballEmpty";
import { Wrapper, ActionButton } from "./EmptyState.styles";

export default function EmptyState({
  illustration = <PokeballEmpty />,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <Wrapper role="status">
      {illustration}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {actionLabel && onAction && (
        <ActionButton type="button" onClick={onAction}>
          {actionLabel}
        </ActionButton>
      )}
    </Wrapper>
  );
}
