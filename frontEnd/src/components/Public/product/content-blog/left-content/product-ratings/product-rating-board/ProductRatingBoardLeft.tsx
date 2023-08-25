import { styled } from "styled-components";

const ProductRatingBoardLeftStyled = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const RatingPoint = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
`;

export default function ProductRatingBoardLeft() {
  return (
    <ProductRatingBoardLeftStyled>
      <RatingPoint>4/5</RatingPoint>
    </ProductRatingBoardLeftStyled>
  );
}
