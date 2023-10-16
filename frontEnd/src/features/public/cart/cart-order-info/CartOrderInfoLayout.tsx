import styled from "styled-components";
import OrderPayment from "./order-payment";
import { Button, Heading, Hr } from "@/components/shared";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "@/constant/path-router";
import OrderInfo from "./order-info/OrderInfo";

const CartOrderInfoLayoutStyled = styled.div`
  width: 60rem;
  margin: 3rem auto;

  .box--heading {
    position: relative;
    text-align: center;
    margin-bottom: 1rem;

    &-back {
      position: absolute;
      left: 0;
      top: -3px;
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--color-primary);
      margin: 1rem 0;
      font-size: 1.4rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .box--info {
    padding: 2rem 1.5rem;
  }
`;

export default function CartOrderInfoLayout() {
  return (
    <CartOrderInfoLayoutStyled>
      <div className="box--heading">
        <Link className="box--heading-back" to={`/${PATH_PUBLIC.cart.root}`}>
          <IoReturnDownBackOutline />
          <span>Quay về</span>
        </Link>
        <Heading $as="h3">Thông tin và thanh toán</Heading>
      </div>
      <Hr />
      <div className="box--info">
        <OrderInfo />
        <OrderPayment />
        <Button className="mt-[2rem]">Tiến hành đặt hàng</Button>
      </div>
    </CartOrderInfoLayoutStyled>
  );
}
