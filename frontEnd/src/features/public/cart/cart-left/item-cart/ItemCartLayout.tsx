import styled from "styled-components";
import CartProductInfo from "./cart-product-info";
import CartProductWarranty from "./cart-product-warranty";
import CartProductPromotions from "./cart-product-promotions";

const ItemCartLayoutStyled = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export default function ItemCartLayout() {
  return (
    <ItemCartLayoutStyled>
      <CartProductInfo />
      <CartProductWarranty />
      <CartProductPromotions />
    </ItemCartLayoutStyled>
  );
}
