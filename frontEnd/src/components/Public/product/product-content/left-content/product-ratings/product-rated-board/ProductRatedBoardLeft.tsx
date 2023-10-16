import { styled } from "styled-components";
import { RatingStar } from "@/components/shared";

const ProductRatedBoardLeftStyled = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--color-grey-300);
`;

const RatedPoint = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
`;

const RatedInfo = styled.p`
  margin-top: 4px;
  & span {
    font-weight: 600;
  }
`;

const POINT = 4.1;
const NUMBER_STAR = 5;

export default function ProductRatedBoardLeft() {
  return (
    <ProductRatedBoardLeftStyled>
      <RatedPoint>
        {POINT}/{NUMBER_STAR}
      </RatedPoint>
      <RatingStar ratePoint={POINT} />
      <RatedInfo>
        <span>2</span> đánh giá và nhận xét
      </RatedInfo>
    </ProductRatedBoardLeftStyled>
  );
}
