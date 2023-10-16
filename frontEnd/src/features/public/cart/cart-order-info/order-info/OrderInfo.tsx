import { Heading } from "@/components/shared";
import { formatCurrencyVND } from "@/utils";
import styled from "styled-components";

const OrderInfoStyled = styled.div`
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 2.5rem 2rem 3rem;
  margin-bottom: 2rem;

  .heading {
    text-transform: uppercase;
    color: var(--color-primary);
    text-align: center;
  }

  .box__info {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    font-size: 1.8rem;
    margin-top: 1rem;
  }
`;

export default function OrderInfo() {
  return (
    <OrderInfoStyled>
      <Heading $as="h4" className="heading">
        Thông tin đặc hàng
      </Heading>
      <div className="box__info">
        <div className="box__info--item">
          <strong>Mã đơn hàng: </strong>
          <span>WN0301397386</span>
        </div>
        <div className="box__info--item">
          <strong>Khách hàng: </strong>
          <span>Nguyễn Lâm Hải Sơn</span>
        </div>
        <div className="box__info--item">
          <strong>Số điện thoại: </strong>
          <span>0345299087</span>
        </div>
        <div className="box__info--item">
          <strong>Email: </strong>
          <span>hson22102000@gmail.com</span>
        </div>
        <div className="box__info--item">
          <strong>Nhận sản phẩm tại: </strong>
          <span>
            134 Nguyễn Thái Học, P. Phạm Ngũ Lão, Q.1, TP HCM, Quận 1, Hồ Chí
            Minh
          </span>
        </div>
        <div className="box__info--item">
          <strong>Tổng tiền: </strong>
          <span>{formatCurrencyVND(25_990_000)}</span>
        </div>
      </div>
    </OrderInfoStyled>
  );
}
