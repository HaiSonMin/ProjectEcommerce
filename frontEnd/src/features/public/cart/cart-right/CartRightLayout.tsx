import styled from "styled-components";

const CartRightLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
`;

export default function CartRightLayout() {
  return <CartRightLayoutStyled>Cart right</CartRightLayoutStyled>;
}
