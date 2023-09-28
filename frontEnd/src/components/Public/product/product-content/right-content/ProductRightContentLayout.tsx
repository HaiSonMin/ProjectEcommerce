import { styled } from "styled-components";
import ProductBlogsLayout from "./product-blogs";

const ProductRightContentLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function ProductRightContentLayout() {
  return (
    <ProductRightContentLayoutStyled>
      <ProductBlogsLayout />
    </ProductRightContentLayoutStyled>
  );
}
