import { styled } from "styled-components";
import ProductLeftContentLayout from "./left-content";
import ProductRightContentLayout from "./right-content";

const ProductContentLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export default function ProductContentLayout() {
  return (
    <ProductContentLayoutStyled>
      <ProductLeftContentLayout />
      <ProductRightContentLayout />
    </ProductContentLayoutStyled>
  );
}
