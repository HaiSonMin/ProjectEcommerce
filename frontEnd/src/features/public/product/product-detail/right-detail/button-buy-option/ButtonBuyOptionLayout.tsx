import { Button } from "@/components";
import styled, { css } from "styled-components";
import { LiaCartPlusSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { PATH_USER } from "@/constant";
import { formatCurrencyVND } from "@/utils";

const ButtonBuyOptionLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledBtn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;
  border-radius: 1rem;
  & span:first-child {
    font-size: 1.6rem;
    text-transform: uppercase;
    font-weight: 600;
  }

  & span:last-child {
    font-size: 1.3rem;
  }
`;

const TopButtonBuy = styled.div`
  display: flex;
  gap: 1rem;
  height: 6rem;

  .btn__buy {
    ${StyledBtn}
    background: linear-gradient(#f52f32, #e11b1e);
  }

  .btn__add--card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--color-primary);
    border-radius: 1rem;
    font-size: 8px;
    font-weight: 600;
    color: var(--color-primary);
    width: 6.5rem;
    flex-shrink: 0;
    cursor: pointer;

    svg {
      width: 3.6rem;
      height: 3.6rem;
    }
  }
`;

const BottomButtonBuy = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  height: 6rem;
`;

const ButtonBuyInstallment = styled(Link)`
  ${StyledBtn}
  background: linear-gradient(180deg,#3a78d0,#277cea);
`;

export default function ButtonBuyOptionLayout() {
  return (
    <ButtonBuyOptionLayoutStyled>
      <TopButtonBuy>
        <Link className="btn__buy" to={`/${PATH_USER.cart}`}>
          <span>Mua ngay</span>
          <span>(Giao nhanh chóng trong 2 giờ hoặc nhận tại cửa hàng)</span>
        </Link>

        <div className="btn__add--card">
          <LiaCartPlusSolid />
          <span>Thêm vào giỏ</span>
        </div>
      </TopButtonBuy>
      <BottomButtonBuy>
        <ButtonBuyInstallment to={"#"}>
          <span>Trả góp 0%</span>
          <span>Trả góp chỉ từ {formatCurrencyVND(23000000)}</span>
        </ButtonBuyInstallment>
        <ButtonBuyInstallment to={"#"}>
          <span>Trả góp qua thẻ</span>
          <span>(Visa, Mastercard, JCB)</span>
        </ButtonBuyInstallment>
      </BottomButtonBuy>
    </ButtonBuyOptionLayoutStyled>
  );
}
