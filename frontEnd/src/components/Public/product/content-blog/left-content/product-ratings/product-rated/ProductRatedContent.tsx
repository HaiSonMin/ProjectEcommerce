import { RatingStar } from "@/components";
import { styled } from "styled-components";

const ProductRatedContentStyled = styled.div`
  margin-left: 3rem;
  margin-top: 6px;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-100);
`;

const Rated = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & strong {
    font-size: 1.2rem;
  }
`;
const Comment = styled.div`
  margin-top: 4px;
  & p {
    font-size: 1.2rem;
  }
`;

export default function ProductRatedContent({ ratedPoint, comment }) {
  return (
    <ProductRatedContentStyled>
      <Rated>
        <strong>Đánh giá:</strong>
        <RatingStar ratePoint={ratedPoint} />
      </Rated>
      <Comment>
        <p>
          <strong>Nhận xét: </strong>
          {comment}
        </p>
      </Comment>
    </ProductRatedContentStyled>
  );
}
