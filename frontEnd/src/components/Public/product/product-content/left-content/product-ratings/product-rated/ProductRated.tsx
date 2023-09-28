import { styled } from "styled-components";
import ProductRatedItem from "./ProductRatedItem";
import { FaRegEye } from "react-icons/fa";

const ProductRatedStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SeeMoreRated = styled.div`
  min-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 8px 0;
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  cursor: pointer;

  & svg {
    transition: all 0.3s;
  }

  &:hover {
    color: var(--color-primary);
    outline: 1px solid var(--color-primary);
    background-color: var(--color-red-100);

    & svg {
      scale: 1.15;
    }
  }
`;
const ratedTest = [
  { _id: "123123123", name: "Son" },
  { _id: "123123122", name: "Trung" },
  { _id: "123123134", name: "Nguyen" },
];

export default function ProductRated() {
  return (
    <ProductRatedStyled>
      {ratedTest.map((rated) => (
        <ProductRatedItem key={rated._id} rated={rated} />
      ))}
      <SeeMoreRated>
        <span>Xem thêm {12} đánh giá</span>
        <FaRegEye />
      </SeeMoreRated>
    </ProductRatedStyled>
  );
}
