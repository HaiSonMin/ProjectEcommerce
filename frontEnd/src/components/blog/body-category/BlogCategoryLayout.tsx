import styled from "styled-components";
import BodyCategoryLeftLayout from "./category-left";
import BodyCategoryMiddleLayout from "./category-middle";
import BodyCategoryRightLayout from "./category-right";

const BlogCategoryLayoutStyled = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 20.5rem 68rem 27.5rem;
  margin-top: 1.5rem;
`;

export default function BlogCategoryLayout() {
  return (
    <BlogCategoryLayoutStyled>
      <BodyCategoryLeftLayout />
      <BodyCategoryMiddleLayout />
      <BodyCategoryRightLayout />
    </BlogCategoryLayoutStyled>
  );
}
