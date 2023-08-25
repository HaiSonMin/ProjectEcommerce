import { styled } from "styled-components";
import ProductBlogsLayout from "./product-blogs";

const ProductRightContentLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 30%;
`;

export default function ProductRightContentLayout() {
  return (
    <ProductRightContentLayoutStyled>
      <ProductBlogsLayout />
    </ProductRightContentLayoutStyled>
  );
}
