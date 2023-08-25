import { styled } from "styled-components";
import ProductLeftContentLayout from "./left-content";
import ProductRightContentLayout from "./right-content";

const ContentBlogLayoutStyled = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export default function ContentBlogLayout() {
  return (
    <ContentBlogLayoutStyled>
      <ProductLeftContentLayout />
      <ProductRightContentLayout />
    </ContentBlogLayoutStyled>
  );
}
