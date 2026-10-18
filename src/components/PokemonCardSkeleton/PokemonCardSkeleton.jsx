import {
  CardWrapper,
  CardLink,
  PokemonNumber,
  ImageContainer,
  PokemonName,
  TypesContainer,
} from "../PokemonCard/PokemonCard.styles";

import {
  SkeletonNumber,
  SkeletonImageCircle,
  SkeletonText,
  SkeletonBadge,
} from "./PokemonCardSkeleton.styles";

export default function PokemonCardSkeleton() {
  return (
    <CardWrapper style={{ pointerEvents: "none" }}>
      <CardLink style={{ cursor: "default" }}>
        <PokemonNumber>
          <SkeletonNumber />
        </PokemonNumber>

        <ImageContainer style={{ background: "transparent" }}>
          <SkeletonImageCircle />
        </ImageContainer>

        <PokemonName>
          <SkeletonText />
        </PokemonName>

        <TypesContainer>
          <SkeletonBadge />
          <SkeletonBadge />
        </TypesContainer>
      </CardLink>
    </CardWrapper>
  );
}
