import { useState } from "react";
import styled from "styled-components";
import { HighLightBlogs, NewBlogs } from "./box-timeline";

const BodyCategoryMiddleLayoutStyled = styled.div``;

const BoxTimeLine = styled.div`
  display: flex;

  .item--timeline {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    margin-right: 1rem;
    cursor: pointer;
  }

  .item--timeline.active {
    font-weight: 600;
    color: var(--color-primary);
    span {
      border-bottom: 2px solid var(--color-primary);
    }
  }

  .item--timeline:not(:last-child) {
    &::after {
      display: block;
      content: "";
      border-right: 1px solid var(--color-grey-400);
      height: 1.2rem;
      margin-left: 1rem;
    }
  }
`;

export default function BodyCategoryMiddleLayout() {
  const [isActiveNew, setIsActiveNew] = useState<boolean>(false);

  const handleActiveNew = () => {
    setIsActiveNew(true);
  };

  const handleActiveHighLight = () => {
    setIsActiveNew(false);
  };

  return (
    <BodyCategoryMiddleLayoutStyled>
      <BoxTimeLine>
        <p
          className={`item--timeline ${isActiveNew ? "active" : ""}`}
          onClick={handleActiveNew}
        >
          <span>Mới nhất</span>
        </p>
        <p
          className={`item--timeline ${!isActiveNew ? "active" : ""}`}
          onClick={handleActiveHighLight}
        >
          <span>Nổi bật gần nhất</span>
        </p>
      </BoxTimeLine>
      {isActiveNew ? <NewBlogs /> : <HighLightBlogs />}
    </BodyCategoryMiddleLayoutStyled>
  );
}
