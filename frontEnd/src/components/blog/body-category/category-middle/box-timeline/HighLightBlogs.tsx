import { ListBlog } from "@/components/blog/shared";
import styled from "styled-components";

const HighLightBlogsStyled = styled.div`
  margin-top: 1.5rem;
`;

export default function HighLightBlogs() {
  return (
    <HighLightBlogsStyled>
      <ListBlog listBlogs={[]} />
    </HighLightBlogsStyled>
  );
}
