import styled from "styled-components";
import IconWeb from "@/assets/icons/icon-logo-web.png";
import { formatCurrencyVND } from "@/utils";
import { InputRank, Heading } from "@/components/shared";
const RankTopStyled = styled.div``;

const MemberInfo = styled.div`
  position: relative;
  width: 100%;
  height: 14rem;
  padding: 1.5rem 1rem;
  background-color: var(--color-primary);
  border-end-start-radius: 2rem;
  border-end-end-radius: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .box--icon {
    width: 4.2rem;
    height: 4.2rem;
    background-color: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    img {
      width: 80%;
      height: 80%;
      object-fit: contain;
      object-position: center;
    }
  }

  .box--info {
    color: var(--color-white);
    p {
      font-size: 1.4rem;
    }
    &-name {
      color: inherit;
    }
  }
`;
const MemberScore = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem 2rem;
  background-color: var(--color-white);
  border-radius: 1.5rem;
  box-shadow: var(--shadow-around);

  .box__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--score {
      display: flex;
      flex-direction: column;

      &-title {
        font-size: 1.8rem;
        font-weight: 600;
      }
      &-price {
        font-size: 2.2rem;
        font-weight: 600;
        color: var(--color-primary);
      }
      &-date {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--color-primary);
      }
    }

    &--rank {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      &-icon {
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          object-fit: contain;
          object-position: center;
        }
      }

      &-name {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--color-primary);
      }
    }
  }

  .box__bottom {
    margin-top: 1rem;
  }

  .need--buy {
    margin-top: 1rem;
    font-size: 1.4rem;
    text-align: center;
    span {
      font-weight: 600;
      color: var(--color-primary);
    }
  }
`;

export default function RankTop() {
  return (
    <RankTopStyled>
      <MemberInfo>
        <div className="box--icon">
          <img src={IconWeb} alt="Icon" />
        </div>
        <div className="box--info">
          <p>Xin chào</p>
          <Heading $as="h5" className="box--info-name">
            Nguyễn Lâm Hải Sơn
          </Heading>
        </div>
        <MemberScore>
          <div className="box__top">
            <div className="box__top--score">
              <p className="box__top--score-title">Điểm tích lũy của bạn</p>
              <p className="box__top--score-price">
                {formatCurrencyVND(18_520_000)}
              </p>
              <p className="box__top--score-date">
                (Điểm tích lũy từ ngày 01/01/2022)
              </p>
            </div>
            <div className="box__top--rank">
              <div className="box__top--rank-icon">
                <img src={IconWeb} alt="icon member" />
              </div>
              <p className="box__top--rank-name">S-Mem</p>
            </div>
          </div>
          <div className="box__bottom">
            <InputRank minPrice={0} maxPrice={1000000} currentPrice={500000} />
          </div>
          <p className="need--buy">
            Bạn cần mua thêm{" "}
            <span className="need--buy-price">
              {formatCurrencyVND(31_480_000)}
            </span>{" "}
            để lên hạng S-Vip
          </p>
        </MemberScore>
      </MemberInfo>
    </RankTopStyled>
  );
}
