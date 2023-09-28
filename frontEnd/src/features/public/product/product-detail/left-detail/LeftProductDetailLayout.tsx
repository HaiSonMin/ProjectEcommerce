import { CarouselImage, CarouselImageProductDetail } from "@/components";
import styled from "styled-components";
import BoxImageLayout from "./box-image";
import WarrantyInfo from "./warranty-info";

const LeftProductDetailLayoutStyled = styled.div`
`;

export default function LeftProductDetailLayout() {
  return (
    <LeftProductDetailLayoutStyled>
      <BoxImageLayout />
      <WarrantyInfo />
    </LeftProductDetailLayoutStyled>
  );
}
