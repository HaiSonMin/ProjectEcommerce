import styled from "styled-components";
import IconWeb from "@/assets/icons/icon-logo-web.png";
import Heading from "@/components/shared/Heading";
import { levelRank, optionsRankSMem } from "@/mocks/member";
import { HeadingNameRank } from "./shared";
import { useState } from "react";
const RankBottomStyled = styled.div`
  margin-top: 14rem;

  .heading--promotion {
    padding: 1rem;
    color: var(--color-white);
    background-color: var(--color-primary);
    border-radius: 1rem;
    text-align: center;
  }

  .box__level {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 2rem;
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

  .box__options {
    margin-top: 2rem;
    &--items {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      margin: 1.5rem 0 2.5rem 8rem;

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
  }
`;

export default function RankBottom() {
  const [activeRank, setActiveRank] = useState<number>(0);

  const handleActiveRank = (index: number) => setActiveRank(index);

  return (
    <RankBottomStyled>
      <Heading $as="h4" className="heading--promotion">
        ĐIỀU KIỆN VÀ ƯU ĐÃI CHO CÁC CẤP ĐỘ SMEMBER
      </Heading>
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
      <div className="box__options">
        {levelRank[activeRank]?.values.map((option) => (
          <div>
            <HeadingNameRank icon={option.icon} nameRank={option.optionName} />
            <div className="box__options--items">
              {option.items.length ? (
                option?.items?.map((item) => (
                  <div className="box__options--items-item">
                    <div className="box__options--items-item-boxIcon">
                      <img src={item.icon} alt="Icon level rank" />
                    </div>
                    <p>{item.name}</p>
                  </div>
                ))
              ) : (
                <p>
                  Hiện tại chưa có {option.optionName} cho hạng thành viên
                  {levelRank[activeRank].rankName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </RankBottomStyled>
  );
}
