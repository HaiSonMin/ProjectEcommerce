import Heading from "@/components/Heading";
import { styled } from "styled-components";
import { FaRankingStar } from "react-icons/fa6";
import ProductRatedBoard from "./product-rated-board";
import ProductRated from "./product-rated";
import ProductRatingModal from "./product-rating-modal";

const ProductRatingLayoutStyled = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
`;

const TitleRatings = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2rem;

  & svg {
    width: 2.8rem;
    height: 1.8rem;
    margin-bottom: 2px;
    color: var(--color-primary);
  }
`;

export default function ProductRatingsLayout() {
  return (
    <ProductRatingLayoutStyled>
      <TitleRatings>
        <FaRankingStar />
        <Heading $as="h4">Đánh giá sản phẩm XXX</Heading>
      </TitleRatings>
      <ProductRatedBoard />
      <ProductRatingModal />
      <ProductRated />
    </ProductRatingLayoutStyled>
  );
}
