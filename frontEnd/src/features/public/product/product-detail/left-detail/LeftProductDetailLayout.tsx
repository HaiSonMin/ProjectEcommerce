import { CarouselImage, CarouselImageProductDetail } from "@/components/shared";
import styled from "styled-components";
import BoxImageLayout from "./box-image";
import WarrantyInfo from "./warranty-info";
import AccessoryPurchasedTogether from "./accessory-purchased-together";

const LeftProductDetailLayoutStyled = styled.div``;

export default function LeftProductDetailLayout() {
  return (
    <LeftProductDetailLayoutStyled>
      <BoxImageLayout />
      <WarrantyInfo />
      <AccessoryPurchasedTogether />
    </LeftProductDetailLayoutStyled>
  );
}
