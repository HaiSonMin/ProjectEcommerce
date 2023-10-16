import { Hr, Heading } from "@/components/shared";
import { ListBlog } from "@/components/blog/shared";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewBlogsStyled = styled.div`
  margin-top: 2rem;
`;

const NewBlog = styled(Link)`
  display: inline-block;
  margin-bottom: 2.5rem;

  .box--image {
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    height: 32rem;
    margin-bottom: 1.5rem;

    img {
      object-fit: cover;
      object-position: center;
    }
  }
`;

const ListNewBlogs = styled.div``;

export default function NewBlogs() {
  return (
    <NewBlogsStyled>
      <NewBlog to="#">
        <div className="box--image">
          <img
            src="https://cdn.tgdd.vn//News/Thumb/1080030/Khay-ke-dung-do-Inochi---Giup-sap-xep-do-vat-ngan-nap-tien-loi--1--760x367.jpg"
            alt="Thumb new blog"
          />
        </div>
        <Heading $as="h3">Vì sao tủ lạnh là xu thế trong 2023</Heading>
      </NewBlog>
      <Hr />
      <ListBlog listBlogs={[]} />
    </NewBlogsStyled>
  );
}
