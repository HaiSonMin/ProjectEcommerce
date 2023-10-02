import styled from "styled-components";
import BodyHomeLeftLayout from "./body-left";
import BodyHomeRightLayout from "./body-right";

const BlogHomeLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 34rem;
  gap:2rem;
  margin: 1.5rem 0;
`;

export default function BlogHomeLayout() {
  return (
    <BlogHomeLayoutStyled>
      <BodyHomeLeftLayout />
      <BodyHomeRightLayout />
    </BlogHomeLayoutStyled>
  );
}
