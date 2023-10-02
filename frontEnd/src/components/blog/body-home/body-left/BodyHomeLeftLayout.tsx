import styled from "styled-components";
import TopBlog from "./top-blog";
import { ListBlog } from "@/components/blog/shared";
import Hr from "@/components/Hr";

const BodyHomeLeftLayoutStyled = styled.div``;

export default function BodyHomeLeftLayout() {
  return (
    <BodyHomeLeftLayoutStyled>
      <TopBlog />
      <ListBlog listBlogs={[]} />
    </BodyHomeLeftLayoutStyled>
  );
}
