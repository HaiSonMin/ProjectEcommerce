import Heading from "@/components/Heading";
import { styled } from "styled-components";
import { FaRankingStar } from "react-icons/fa6";
import ProductRatingBoard from "./product-rating-board";

const ProductRatingLayoutStyled = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const TitleRatings = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & svg {
    width: 2rem;
    height: 2rem;
    margin-bottom: 2px;
  }
`;

export default function ProductRatingsLayout() {
  return (
    <ProductRatingLayoutStyled>
      <TitleRatings>
        <FaRankingStar />
        <Heading $as="h5">Đánh giá sản phẩm XXX</Heading>
      </TitleRatings>
      <ProductRatingBoard />
    </ProductRatingLayoutStyled>
  );
}
