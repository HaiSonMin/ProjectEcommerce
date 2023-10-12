import { randomKey } from "@/utils";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";
import { PATH_BLOG } from "@/constant/path-router";
const BlogHeaderStyled = styled.article``;

const BlogNavBar = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 1rem;
`;

const BlogNavItem = styled.li`
  display: inline-block;
  position: relative;
  font-size: 1.4rem;
  border-radius: 5px;
  flex-grow: 1;
  cursor: pointer;
  color: var(--color-text);

  .nav--link {
    display: inline-block;
    padding: 6px 1.2rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  &:not(:last-child) {
    &::after {
      display: block;
      position: absolute;
      content: "";
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      border-right: 1px solid var(--color-grey-300);
      height: 2rem;
    }
  }

  &:last-child:hover {
    &::after {
      display: block;
      position: absolute;
      content: "";
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      border-right: 1px solid var(--color-white);
      height: 2rem;
    }
  }

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &:hover::after {
    border-right: 1px solid var(--color-white);
  }
`;

const itemsTest = [
  {
    title: "tivi",
  },
  {
    title: " tủ lạnh",
  },
  {
    title: "máy giặc",
  },
  {
    title: "điện thoại-máy tính",
  },
  {
    title: "đồng hồ",
  },
  {
    title: "gia dụng",
  },
  {
    title: "thiết bị thông minh",
  },
  {
    title: "sức khỏe thể thao",
  },
  {
    title: "mẹo vặt",
  },
];

export default function BlogHeader() {
  return (
    <BlogHeaderStyled>
      <BlogNavBar>
        <BlogNavItem className="leading-none">
          <Link to={`/${PATH_BLOG.blogHome}`} className="nav--link">
            <HiHome />
          </Link>
        </BlogNavItem>
        {itemsTest.map((itemNav) => (
          <BlogNavItem key={randomKey()}>
            <Link
              to={`/${PATH_BLOG.blogHome}/${PATH_BLOG.category}`}
              className="nav--link"
            >
              {itemNav.title.toUpperCase()}
            </Link>
          </BlogNavItem>
        ))}
      </BlogNavBar>
    </BlogHeaderStyled>
  );
}
