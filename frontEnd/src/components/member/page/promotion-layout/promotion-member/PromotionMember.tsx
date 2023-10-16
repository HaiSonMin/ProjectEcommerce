import styled from "styled-components";
import IconWeb from "@/assets/icons/icon-logo-web.png";
import { useState } from "react";
import { levelRank } from "@/mocks/member";
import { randomKey } from "@/utils";

const PromotionMemberStyled = styled.div`
  .box__level {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &--item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      cursor: pointer;

      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6rem;
        height: 6rem;
        border: 1px solid var(--color-grey-300);
        border-radius: 50%;
        background-color: var(--color-grey-200);
        img {
          width: 75%;
          height: 75%;
          object-fit: contain;
          object-position: center;
        }
      }

      &-rankname {
        font-size: 1.2rem;
      }
    }

    &--item.active {
      color: var(--color-primary);
      .box__level--item-icon {
        background-color: var(--color-primary-light);
        border: 1px solid var(--color-primary);
      }
    }
  }

  .box__promotion--switch {
    position: relative;
    display: flex;
    margin-top: 3rem;

    &::after {
      display: block;
      content: "";
      position: absolute;
      top: 3rem;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: var(--color-grey-300);
    }

    &-name {
      text-align: center;
      cursor: pointer;
      flex-grow: 1;
      font-weight: 600;
      color: var(--color-grey-500);
    }

    &-name.active {
      position: relative;
      color: var(--color-primary);
      &::after {
        display: block;
        content: "";
        position: absolute;
        top: 3rem;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: var(--color-primary);
        z-index: 10;
      }
    }
  }

  .box__promotion--option {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;

    &-notfound {
      span {
        font-weight: 600;
        color: var(--color-primary);
      }
    }

    &-item {
      display: flex;
      align-items: center;
      gap: 2rem;

      &-boxIcon {
        flex-shrink: 0;
        width: 4rem;
        height: 4rem;

        img {
          object-fit: contain;
          object-position: center;
        }
      }
    }
  }
`;

export default function PromotionMember() {
  const [activeRank, setActiveRank] = useState<number>(0);
  const [activePromotion, setActivePromotion] = useState<number>(0);

  const handleActiveRank = (index: number) => setActiveRank(index);
  const handleActivePromotion = (index: number) => setActivePromotion(index);

  return (
    <PromotionMemberStyled>
      <div className="box__level">
        {levelRank.map((item, i) => (
          <div
            className={`box__level--item ${activeRank === i && "active"}`}
            onClick={() => handleActiveRank(i)}
            key={item.key}
          >
            <div className="box__level--item-icon" key={item.key}>
              <img src={IconWeb} alt="Icon Level" />
            </div>
            <p className="box__level--item-rankname">{item.rankName}</p>
          </div>
        ))}
      </div>
      <div className="box__promotion--switch">
        {levelRank[activeRank].values.slice(1).map((item, i) => (
          <p
            className={`box__promotion--switch-name ${
              activePromotion === i && "active"
            }`}
            onClick={() => handleActivePromotion(i)}
            key={randomKey()}
          >
            {item.optionName}
          </p>
        ))}
      </div>
      <div className="box__promotion--option">
        {!levelRank[activeRank].values.slice(1)[activePromotion].items
          .length ? (
          <p className="box__promotion--option-notfound">
            Hiện tại chưa có ưu đãi đặc biệt nào dành cho{" "}
            <span>{levelRank[activeRank].rankName}</span>
          </p>
        ) : (
          <>
            {levelRank[activeRank].values
              .slice(1)
              [activePromotion].items.map((item) => (
                <div className="box__promotion--option-item">
                  <div className="box__promotion--option-item-boxIcon">
                    <img src={item.icon} alt="Icon level rank" />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </PromotionMemberStyled>
  );
}
