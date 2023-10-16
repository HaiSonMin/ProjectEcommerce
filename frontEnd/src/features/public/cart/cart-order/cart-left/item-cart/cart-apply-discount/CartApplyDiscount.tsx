import { useState } from "react";
import { BiBarcode } from "react-icons/bi";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import styled from "styled-components";

const CartApplyDiscountStyled = styled.div`
  margin-bottom: 1.5rem;
`;

const BtnChoseDiscount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid var(--color-grey-400);
  width: fit-content;
  padding: 2px 5px 2px 1rem;
  border-radius: 1rem;
  cursor: pointer;
  svg {
    flex-shrink: 0;
  }
  .icon-code {
    width: 2rem;
    height: 2rem;
  }

  .icon-arrow {
    width: 3rem;
    height: 3rem;
  }
`;

const BoxEnterCode = styled.div`
  position: relative;
  display: flex;
  padding: 1rem;
  background-color: var(--color-grey-200);
  border-radius: 1rem;
  margin-top: 1.2rem;

  .input--code {
    outline: none;
    flex-grow: 1;
    padding: 0 1rem;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: 1.4rem;
  }

  .btn--apply {
    color: var(--color-white);
    background-color: var(--color-primary);
    padding: 6px 2rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    left: 5rem;
    top: -1rem;
    border-bottom: 1rem solid var(--color-grey-200);
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
  }
`;

export default function CartApplyDiscount() {
  const [isEnterDiscount, setIsEnterDiscount] = useState<boolean>(false);

  const handleToggleEnterDiscount = () => setIsEnterDiscount(!isEnterDiscount);

  return (
    <CartApplyDiscountStyled>
      <BtnChoseDiscount onClick={handleToggleEnterDiscount}>
        <BiBarcode className="icon-code" />
        <p>Dùng mã giảm giá</p>
        {isEnterDiscount ? (
          <MdOutlineArrowDropDown className="icon-arrow" />
        ) : (
          <MdOutlineArrowDropUp className="icon-arrow" />
        )}
      </BtnChoseDiscount>
      {isEnterDiscount && (
        <BoxEnterCode>
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            className="input--code"
          />
          <div className="btn--apply">Áp dụng</div>
        </BoxEnterCode>
      )}
    </CartApplyDiscountStyled>
  );
}
