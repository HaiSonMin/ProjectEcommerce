import { useState } from "react";
import styled from "styled-components";
import PromotionMember from "./promotion-member";
import GiftMember from "./gift-member";

const MemberPromotionLayoutStyled = styled.div``;

const BoxSwitch = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 1rem;
  background-color: var(--color-grey-200);

  .btn--switch {
    flex-grow: 1;
    padding: 5px 0;
    border-radius: 1rem;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  }
  .btn--switch.active {
    color: var(--color-primary);
    background-color: var(--color-white);
  }
`;

const BoxContext = styled.div`
  width: 60rem;
  margin: 5rem auto;
`;

export default function MemberPromotionLayout() {
  const [isActivePromotion, setIsActivePromotion] = useState<boolean>(true);
  const handleActivePromotion = () => setIsActivePromotion(true);
  const handleUnActivePromotion = () => setIsActivePromotion(false);

  return (
    <MemberPromotionLayoutStyled>
      <BoxSwitch>
        <p
          className={`btn--switch ${isActivePromotion && "active"}`}
          onClick={handleActivePromotion}
        >
          Ưu đãi member
        </p>
        <p
          className={`btn--switch ${!isActivePromotion && "active"}`}
          onClick={handleUnActivePromotion}
        >
          Quà tặng của bạn
        </p>
      </BoxSwitch>
      <BoxContext>
        {isActivePromotion ? <PromotionMember /> : <GiftMember />}
      </BoxContext>
    </MemberPromotionLayoutStyled>
  );
}
