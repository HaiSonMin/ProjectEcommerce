import { Heading } from "@/components";
import styled from "styled-components";
import ItemCart from "./item-cart";

const CartLeftLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
`;

const BoxItemCart = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default function CartLeftLayout() {
  return (
    <CartLeftLayoutStyled>
      <Heading $as="h4">Giỏ hàng của bạn</Heading>
      <BoxItemCart>
        <ItemCart />
        <ItemCart />
        <ItemCart />
      </BoxItemCart>
    </CartLeftLayoutStyled>
  );
}
