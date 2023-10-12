import Heading from "@/components/Heading";
import { formatCurrencyVND } from "@/utils";
import styled from "styled-components";
import LogoWeb from "@/assets/icons/icon-logo-web.png";


const HistoryTopStyled = styled.div``;

const MemberInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  .member--icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 7rem;
    background-color: var(--color-white);
    border-radius: 50%;
    box-shadow: var(--shadow-around);
    img {
      width: 70%;
      height: 70%;
      object-fit: contain;
      object-position: center;
    }
  }

  .member--info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &-rank {
      width: fit-content;
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-primary);
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid var(--color-primary);
    }
  }
`;
const OrderInfo = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 0;
  margin-top: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);

  .order--info {
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    span {
      font-size: 2.4rem;
      font-weight: 600;
    }
    p {
      font-size: 1.4rem;
    }
  }

  .bulkhead {
    content: "";
    height: 6rem;
    width: 1px;
    background-color: var(--color-grey-600);
  }
`;

export default function HistoryTop() {
  return (
    <HistoryTopStyled>
      <MemberInfo>
        <div className="member--icon">
          <img src={LogoWeb} alt="icon logo web" />
        </div>
        <div className="member--info">
          <Heading $as="h4">Nguyễn Lâm Hải Sơn</Heading>
          <p className="member--info-rank">SMember</p>
        </div>
      </MemberInfo>
      <OrderInfo>
        <div className="order--info">
          <span>2</span>
          <p>Đơn hàng</p>
        </div>
        <div className="bulkhead" />
        <div className="order--info">
          <span>{formatCurrencyVND(18_780_900)}</span>
          <p>Tiền tích lũy</p>
        </div>
      </OrderInfo>
    </HistoryTopStyled>
  );
}
