import { styled } from "styled-components";
import ProductRatingBoardLeft from "./ProductRatingBoardLeft";
import ProductRatingBoardRight from "./ProductRatingBoardRight";

const ProductRatingBoardStyled = styled.div`
  display: flex;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
`;

const ratingsTest = [{}];

export default function ProductRatingBoard() {
  return (
    <ProductRatingBoardStyled>
      <ProductRatingBoardLeft />
      <ProductRatingBoardRight />
    </ProductRatingBoardStyled>
  );
}
