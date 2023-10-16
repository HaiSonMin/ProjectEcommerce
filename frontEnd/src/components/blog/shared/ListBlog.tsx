import ButtonSeeMore from "@/components/shared/ButtonSeeMore";
import Heading from "@/components/shared/Heading";
import Hr from "@/components/shared/Hr";
import { randomKey } from "@/utils";
import { IoTimerOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListBlogStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const ListBlogBox = styled.ul``;
const ListItem = styled.li`
  margin: 1rem 0;

  .blog--item-link {
    display: flex;
    gap: 2rem;

    &:hover {
      .box--content {
        &-heading {
          color: var(--color-primary);
        }
      }
    }

    .box--image {
      border-radius: 1rem;
      overflow: hidden;
      img {
        width: 20rem;
        height: 10rem;
      }
    }

    .box--content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      flex-grow: 1;
      font-size: 1.2rem;
      color: var(--color-grey-500);

      .box--bottom {
        display: flex;
        gap: 2rem;

        &-advise {
          display: flex;
          align-items: center;
          flex-shrink: 1;
          gap: 2px;
          padding: 2px 1rem;
          background-color: var(--color-secondary);
          border-radius: 4px;
        }

        &-update {
          display: flex;
          align-items: center;
          gap: 2px;
        }
      }
    }
  }
`;

const blogsTest = [
  {
    thumb: "https://cdn.tgdd.vn/News/Thumb/1545419/CE--1--760x367.jpg",
    title: "Hướng dẫn vệ sinh máy đánh trứng chi tiết",
  },
  {
    thumb: "https://cdn.tgdd.vn/News/Thumb/1454878/Dien-may--5--760x367.jpg",
    title: "Hướng dẫn vệ sinh máy đánh trứng chi tiết",
  },
  {
    thumb:
      "https://cdn.tgdd.vn/News/Thumb/1088586/Ban-sao-cua-Gioi-thieu-hang-760x367.jpg",
    title: "Hướng dẫn vệ sinh máy đánh trứng chi tiết",
  },
  {
    thumb:
      "https://cdn.tgdd.vn/News/Thumb/0/huong-dan-cach-reset-may-giat-lg-cuc-ki-don-gian-760x367.jpg",
    title: "Hướng dẫn vệ sinh máy đánh trứng chi tiết",
  },
  {
    thumb: "https://cdn.tgdd.vn/News/Thumb/1403912/Dien-may-760x367.png",
    title: "Hướng dẫn vệ sinh máy đánh trứng chi tiết",
  },
];

interface IProps {
  listBlogs: Array<any>;
}

export default function ListBlog({ listBlogs }: IProps) {
  return (
    <ListBlogStyled>
      <ListBlogBox>
        {blogsTest.map((blogItem, i) => (
          <>
            <ListItem key={randomKey()}>
              <Link to={"#"} className="blog--item-link">
                <div className="box--image">
                  <img src={blogItem.thumb} alt="thumb blog" />
                </div>
                <div className="box--content">
                  <Heading $as="h4" className="box--content-heading">
                    {blogItem.title}
                  </Heading>
                  <div className="box--bottom">
                    <div className="box--bottom-advise">
                      <TbCategory />
                      <span>Tư vấn mua đèn điện, đèn sạt</span>
                    </div>
                    <div className="box--bottom-update">
                      <IoTimerOutline />
                      <p>Cập nhật vài giây trước</p>
                    </div>
                  </div>
                </div>
              </Link>
            </ListItem>
            {i !== blogsTest.length - 1 && <Hr />}
          </>
        ))}
      </ListBlogBox>
      <ButtonSeeMore>Xem thêm bài viết</ButtonSeeMore>
    </ListBlogStyled>
  );
}
