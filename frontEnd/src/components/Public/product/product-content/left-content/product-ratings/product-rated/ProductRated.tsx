import { styled } from "styled-components";
import ProductRatedItem from "./ProductRatedItem";
import { FaRegEye } from "react-icons/fa";
import { ButtonSeeMore } from "@/components/shared";

const ProductRatedStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
      <ButtonSeeMore>Xem thêm {12} đánh giá</ButtonSeeMore>
    </ProductRatedStyled>
  );
}
