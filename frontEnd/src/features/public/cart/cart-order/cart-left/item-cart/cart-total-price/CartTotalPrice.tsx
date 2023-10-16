import { formatCurrencyVND } from "@/utils";
import styled from "styled-components";

const CartTotalPriceStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-grey-300);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);

  .cart--row {
    display: flex;
    justify-content: space-between;

    &-note {
      font-size: 1.4rem;
    }

    &-price {
      font-weight: 600;
      color: var(--color-primary);
      align-self: flex-end;
    }
  }
`;

export default function CartTotalPrice() {
  return (
    <CartTotalPriceStyled>
      <div className="cart--row">
        <div>
          <strong>TẠM TÍNH</strong>
          <p className="cart--row-note">(Giá chưa bao gồm phí vận chuyển)</p>
        </div>
        <p className="cart--row-price">{formatCurrencyVND(4_790_000)}</p>
      </div>
      <div className="cart--row">
        <strong>PHÍ VẬN CHUYỂN</strong>
        <p className="cart--row-price">{formatCurrencyVND(0)}</p>
      </div>
      <div className="cart--row">
        <strong>TỔNG CỘNG</strong>
        <p className="cart--row-price">{formatCurrencyVND(4_790_000)}</p>
      </div>
    </CartTotalPriceStyled>
  );
}
