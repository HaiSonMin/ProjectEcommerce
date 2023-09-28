import styled from "styled-components";
import ItemOptionLayout from "./item-option";
import MorePromotionLayout from "./more-promotion";
import ButtonBuyOptionLayout from "./button-buy-option";
import Warranty from "./warranty";
import PromotionLayout from "./promotion";

const RightProductDetailLayoutStyled = styled.div``;

export default function RightProductDetailLayout() {
  return (
    <RightProductDetailLayoutStyled>
      <ItemOptionLayout />
      <PromotionLayout />
      <ButtonBuyOptionLayout />
      <MorePromotionLayout />
      <Warranty />
    </RightProductDetailLayoutStyled>
  );
}
