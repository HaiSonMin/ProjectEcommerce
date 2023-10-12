import Heading from "@/components/shared/Heading";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoTimerOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { BlogsMoreView } from "@/components/blog/shared";

const TopBlogStyled = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const BoxBlogNew = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50rem;
  flex-shrink: 0;

  .box--image {
    border-radius: 1rem;
    overflow: hidden;
  }

  .box--title {
    font-size: 2.2rem;
    line-height: 1.3;
  }

  .box--bottom {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: var(--color-grey-500);

    &-advise {
      display: flex;
      align-items: center;
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
`;

const BoxBlogsMoreView = styled.div`
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

export default function TopBlogLayout() {
  return (
    <TopBlogStyled>
      <BoxBlogNew to={"#"}>
        <div className="box--image">
          <img
            src="https://cdn.tgdd.vn/News/Thumb/1547613/den-pin-doi-dau-la-gi-cau-tao-va-uu-diem-cua-den-thumb-760x367.jpg"
            alt="thumb blog"
          />
        </div>
        <Heading $as="h3" className="box--title">
          Đèn pin đội đầu là gì? Cấu tạo và ưu điểm của đèn?
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
      </BoxBlogNew>
      <BlogsMoreView blogs={[]} />
    </TopBlogStyled>
  );
}
