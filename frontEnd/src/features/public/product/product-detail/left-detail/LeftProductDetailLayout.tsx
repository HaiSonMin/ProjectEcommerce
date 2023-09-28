import { CarouselImage, CarouselImageProductDetail } from "@/components";
import styled from "styled-components";

const LeftProductDetailLayoutStyled = styled.div`
  border: solid 1px var(--color-grey-300);
`;

export default function LeftProductDetailLayout() {
  return (
    <LeftProductDetailLayoutStyled>
      <CarouselImageProductDetail items={[]} />
    </LeftProductDetailLayoutStyled>
  );
}
