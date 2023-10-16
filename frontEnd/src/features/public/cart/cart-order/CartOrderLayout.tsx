import { Hr } from "@/components/shared";
import { PATH_PUBLIC } from "@/constant/path-router";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartLeftLayout from "./cart-left";
import CartRightLayout from "./cart-right";

const CartOrderLayoutStyled = styled.div`
  margin: 1rem 0;
`;

const MoveBackHome = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--color-primary);
  margin: 1rem 0;
  font-size: 1.4rem;

  &:hover {
    text-decoration: underline;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const BoxContentCart = styled.div`
  display: grid;
  grid-template-columns: 51rem 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export default function CartOrderLayout() {
  return (
    <CartOrderLayoutStyled>
      <MoveBackHome to={`/${PATH_PUBLIC.home}`}>
        <IoReturnDownBackOutline />
        <p>Quay lại mua thêm sản phẩm khác</p>
      </MoveBackHome>
      <Hr />
      <BoxContentCart>
        <CartLeftLayout />
        <CartRightLayout />
      </BoxContentCart>
    </CartOrderLayoutStyled>
  );
}
