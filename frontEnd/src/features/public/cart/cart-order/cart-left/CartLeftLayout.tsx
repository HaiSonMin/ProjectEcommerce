import { useState } from "react";
import ItemCart from "./item-cart";
import styled from "styled-components";
import { InputChecked, Heading, Hr } from "@/components/shared";
import CartApplyDiscount from "./item-cart/cart-apply-discount";
import CartTotalPrice from "./item-cart/cart-total-price";

const CartLeftLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  padding: 1.5rem 2rem;
`;

const BoxItemCart = styled.ul`
  display: flex;
  flex-direction: column;
  margin:2rem 0;
  gap:1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  .box--chose {
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;

    &-input {
      position: relative;
      width: 1.8rem;
      height: 1.8rem;
      border: 1px solid var(--color-grey-500);
      border-radius: 50%;
    }

    &-input.active {
      border-color: var(--color-primary);
      box-shadow: var(--color-primary) 0px 0px 2px 1px;

      svg {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-primary);
      }
    }
  }
`;

export default function CartLeftLayout() {
  const [isChoseAll, setIsChoseAll] = useState<boolean>(false);

  const handleToggleChoseAll = () => setIsChoseAll(!isChoseAll);

  return (
    <CartLeftLayoutStyled>
      <Header>
        <Heading $as="h4">Giỏ hàng của bạn</Heading>
        <div className="box--chose" onClick={handleToggleChoseAll}>
          <InputChecked isChose={isChoseAll} label="Chọn tất cả" />
        </div>
      </Header>
      <Hr />
      <BoxItemCart>
        <ItemCart />
        <ItemCart />
      </BoxItemCart>
      <CartApplyDiscount />
      <CartTotalPrice />
    </CartLeftLayoutStyled>
  );
}
