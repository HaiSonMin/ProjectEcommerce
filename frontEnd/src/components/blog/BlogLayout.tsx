import styled from "styled-components";
import BlogHeader from "./header/BlogHeader";
import Hr from "../Hr";
import { Outlet } from "react-router-dom";

const BlogLayoutStyled = styled.section`
  padding-top: 2.5rem;
  padding-bottom: 1rem;
`;

export default function BlogLayout() {
  return (
    <BlogLayoutStyled>
      <BlogHeader />
      <Hr />
      <Outlet />
    </BlogLayoutStyled>
  );
}
