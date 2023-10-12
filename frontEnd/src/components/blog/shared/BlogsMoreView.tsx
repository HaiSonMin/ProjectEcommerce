import Heading from "@/components/shared/Heading";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogsMoreViewStyled = styled.div`
  .box--blogs {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    &-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid var(--color-grey-200);
      padding: 1rem 0;
      .box--blogs-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        min-height: 3.5rem;

        .box--blogs-number {
          position: relative;
          display: inline-block;
          line-height: 1rem;
          padding: 8px 1rem 5px;
          background-color: var(--color-primary);
          color: var(--color-white);
          font-weight: 800;
          align-self: flex-start;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;

          &::after {
            display: block;
            content: "";
            position: absolute;
            width: 100%;
            height: 1rem;
            left: 0;
            bottom: -1rem;
            border-top: 1rem solid var(--color-primary);
            border-left: 1.5rem solid transparent;
            border-right: 1.5rem solid transparent;
          }
        }

        .box--blogs-title {
          align-self: flex-start;
          font-size: 1.4rem;
          line-height: 1.3;
        }
      }

      :hover {
        color: var(--color-primary);
      }
    }

    &-item:last-child {
      border-bottom: 1px solid transparent;
    }
  }
`;

const blogsTest = [
  {
    title: "Tất tần tật về chương trình ưu đãi app Quà Tặng Vip",
  },
  {
    title: "Cách đổi mật khẩu cho máy tính win 10 ",
  },
  {
    title:
      "4 lý do khiến điều hòa đột ngột bị ngắt khi đang chạy và cách khắc phục ",
  },
  {
    title: "8 cách đuổi và diệt muỗi hiệu quả nhất dể phòng tránh vi rút Zika",
  },
  {
    title: "5 lý do khiến dàn nóng máy lạnh kêu to và cách khắc phục",
  },
];

export default function BlogsMoreView({ blogs }) {
  return (
    <BlogsMoreViewStyled>
      <Heading $as="h4">Bài viết xem nhiều</Heading>
      <ul className="box--blogs">
        {blogsTest.map((blogItem, i) => (
          <li className="box--blogs-item">
            <Link to={"$"} className="box--blogs-link">
              <span className="box--blogs-number">{i + 1}</span>
              <p className="box--blogs-title">{blogItem.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </BlogsMoreViewStyled>
  );
}
