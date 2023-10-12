import styled from "styled-components";
import LogoWeb from "@/assets/icons/icon-logo-web.png";
import Heading from "@/components/Heading";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { formatCurrencyVND } from "@/utils";
import { FaRankingStar } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";

const LeftBoardInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  padding-top: 1rem;
  padding-bottom: 3rem;

  .box-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7rem;
    height: 7rem;
    border: 1px solid var(--color-grey-400);
    border-radius: 50%;
    img {
      width: 80%;
      height: 80%;
    }
  }

  .box--welcome {
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    &-hi {
      font-weight: 500;
    }
    &-name {
      text-transform: uppercase;
      color: var(--color-primary);
    }
  }

  .box--info {
    display: flex;
    width: 100%;

    &-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      svg {
        color: var(--color-primary);
        width: 4rem;
        height: 4rem;
      }
    }
  }
`;

export default function LeftBoardInfo() {
  return (
    <LeftBoardInfoStyled>
      <div className="box-icon">
        <img src={LogoWeb} alt="Logo web" />
      </div>
      <div className="box--welcome">
        <p className="box--welcome-hi">Xin chào</p>
        <Heading $as="h3" className="box--welcome-name">
          Nguyễn Lâm Hải Sơn
        </Heading>
      </div>
      <div className="box--info">
        <div className="box--info-item">
          <strong>Ngày tham gia</strong>
          <BsFillCalendar2DateFill />
          <p>7/7/2022</p>
        </div>
        <div className="box--info-item">
          <strong>Hạng thành viên</strong>
          <FaRankingStar />
          <p>SMem</p>
        </div>
        <div className="box--info-item">
          <strong>Điển tích lũy </strong>
          <GiReceiveMoney />
          <p>{formatCurrencyVND(18_520_000)}</p>
        </div>
      </div>
    </LeftBoardInfoStyled>
  );
}
