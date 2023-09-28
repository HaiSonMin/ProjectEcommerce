import { styled } from "styled-components";
import { useState } from "react";
import LeftProductDetailLayout from "./left-detail";
import RightProductDetailLayout from "./right-detail";
import HeaderDetailLayout from "./header-detail";
import { Hr } from "@/components";

const ProductDetailLayoutStyled = styled.div`
  margin: 3rem 0;
`;

const BodyDetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export default function ProductDetailLayout() {
  return (
    <ProductDetailLayoutStyled>
      <HeaderDetailLayout />
      <Hr />
      <BodyDetailLayout>
        <LeftProductDetailLayout />
        <RightProductDetailLayout />
      </BodyDetailLayout>
    </ProductDetailLayoutStyled>
  );
}
