import { styled } from "styled-components";
import ProductRatedBoardLeft from "./ProductRatedBoardLeft";
import ProductRatedBoardRight from "./ProductRatedBoardRight";

const ProductRatedBoardStyled = styled.div`
  display: flex;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
`;

export default function ProductRatedBoard() {
  return (
    <ProductRatedBoardStyled>
      <ProductRatedBoardLeft />
      <ProductRatedBoardRight />
    </ProductRatedBoardStyled>
  );
}
