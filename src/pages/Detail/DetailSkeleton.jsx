import { DetailPage, DetailCard } from "./Detail.styles";
import { Block, Hero, Row } from "./DetailSkeleton.styles";

export default function DetailSkeleton() {
  return (
    <DetailPage
      $accent="#e5e7eb"
      aria-busy="true"
      aria-label="Cargando detalle del Pokémon"
    >
      <Block $w="150px" $h="36px" $m="0 0 16px" />
      <DetailCard>
        <Hero>
          <Block $w="220px" $h="220px" $r="50%" />
          <Block $w="180px" $h="28px" />
          <Row>
            <Block $w="70px" $h="24px" $r="12px" />
            <Block $w="70px" $h="24px" $r="12px" />
          </Row>
        </Hero>
        {Array.from({ length: 6 }).map((_, i) => (
          <Block key={i} $h="12px" $m="0 0 18px" />
        ))}
      </DetailCard>
    </DetailPage>
  );
}
