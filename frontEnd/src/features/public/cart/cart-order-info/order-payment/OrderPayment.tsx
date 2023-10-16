import { Heading } from "@/components/shared";
import styled from "styled-components";
import logoTransfer from "@/assets/logos/payments/transfer.png";
import logoStore from "@/assets/logos/payments/shop.png";
import logoMomo from "@/assets/logos/payments/momo_horizontal.webp";
import shopeePay from "@/assets/logos/payments/ShopeePay.webp";
import vnPay from "@/assets/logos/payments/VNPAY.webp";
import zaloPay from "@/assets/logos/payments/ZaloPay.webp";

const OrderPaymentStyled = styled.div`
  .box__payment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    &--option {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem 2.5rem;
      border-radius: 1rem;
      background-color: var(--color-white);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        box-shadow: var(--shadow-around);
      }

      &-image {
        width: 3rem;
        height: 3rem;

        img {
          object-fit: contain;
          object-position: center;
        }
      }
    }
  }
`;

export default function OrderPayment() {
  return (
    <OrderPaymentStyled>
      <Heading $as="h3">Chọn hình thức thanh toán</Heading>
      <ul className="box__payment">
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img src={logoStore} alt="logo store" />
          </div>
          <span>Thanh toán tại cửa hàng</span>
        </li>
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img
              className="box__payment--option-image"
              src={logoTransfer}
              alt="logo payment"
            />
          </div>
          <span>Thanh toán chuyển khoản</span>
        </li>
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img
              className="box__payment--option-image"
              src={vnPay}
              alt="logo vnpay"
            />
          </div>
          <span>VNPAY</span>
        </li>
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img
              className="box__payment--option-image"
              src={zaloPay}
              alt="logo zalopay"
            />
          </div>
          <span>ZaloPay</span>
        </li>
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img
              className="box__payment--option-image"
              src={shopeePay}
              alt="logo shopeepay"
            />
          </div>
          <span>ShoppePay</span>
        </li>
        <li className="box__payment--option">
          <div className="box__payment--option-image">
            <img
              className="box__payment--option-image"
              src={logoMomo}
              alt="logo momo"
            />
          </div>
          <span>Ví điện tử Momo</span>
        </li>
      </ul>
    </OrderPaymentStyled>
  );
}
