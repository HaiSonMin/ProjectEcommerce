import { ButtonSeeMoreLink } from "@/components";
import Heading from "@/components/Heading";
import { PATH_BLOG } from "@/constant/path-router";
import { BsNewspaper } from "react-icons/bs";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ProductBlogsLayoutStyled = styled.div`
  width: 100%;
`;

const ProductBlogsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const BlogTitle = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & svg {
    color: var(--color-primary);
    width: 2rem;
    height: 2rem;
  }
`;

const BlogItem = styled(Link)`
  display: flex;
  gap: 1rem;
  height: 6.5rem;

  &:hover {
    text-decoration: underline;
    color: var(--color-primary);
  }

  & .blog-thumb {
    height: 100%;
    max-width: 10rem;
    border-radius: 1rem;
  }

  & .blog-title {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: -0.2px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.6;
  }
`;

const blogsTest = [
  {
    id: "12",
    linkTo: `/${PATH_BLOG.blog}`,
    titleBlog:
      "Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng y,Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng y,Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng y,Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng y,Máy tính laptop là thiết bị công nghệ được rất nhiều người dùng y",
    thumbBlog:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/Vi-xu-ly-ARM-tren-Windows-3-1.jpg",
  },
  {
    id: "13",
    linkTo: `/${PATH_BLOG.blog}`,
    titleBlog: "Laptop mang thiết kế sang trọng, nhỏ gọn, tiện lợi",
    thumbBlog:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/laptop-len-man-hinh-nhung-khong-chay-1.jpg",
  },
  {
    id: "14",
    linkTo: `/${PATH_BLOG.blog}`,
    titleBlog: "Máy cho sv kế toán dưới 15tt có những dòng nào ạ",
    thumbBlog:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/nen-mua-macbook-hay-laptop-thumb.jpg",
  },
  {
    id: "15",
    linkTo: `/${PATH_BLOG.blog}`,
    titleBlog: "Xin được thông tin đến Chị ạ",
    thumbBlog:
      "https://cellphones.com.vn/sforum/wp-content/uploads/2023/07/laptop-tu-tat-man-hinh.jpg",
  },
];

export default function ProductBlogsLayout() {
  return (
    <ProductBlogsLayoutStyled>
      <ProductBlogsBox>
        <BlogTitle>
          <BsNewspaper />
          <Heading $as="h5">Tin tức về sản phẩm laptop</Heading>
        </BlogTitle>
        {blogsTest.map((blog) => (
          <BlogItem key={blog.titleBlog} to={blog.linkTo}>
            <img className="blog-thumb" src={blog.thumbBlog} />
            <div className="blog-title">{blog.titleBlog}</div>
          </BlogItem>
        ))}
        <ButtonSeeMoreLink to="#">Xem thêm bài viết</ButtonSeeMoreLink>
      </ProductBlogsBox>
    </ProductBlogsLayoutStyled>
  );
}
