import { styled } from "styled-components";
import LeftProductDetailLayout from "./left-detail";
import RightProductDetailLayout from "./right-detail";
import HeaderDetailLayout from "./header-detail";
import { Hr, SpinnerLogo } from "@/components/shared";
import BreadcrumbLayout from "./breadcrumb";
import { UseProductApi } from "@/apis-use";
import SameProductLayout from "./same-product";
import { ProductContentLayout } from "@/components/public/product";

const ProductDetailLayoutStyled = styled.div`
  margin: 3rem 0;
`;

const BodyDetailLayout = styled.div`
  display: grid;
  grid-template-columns: 72rem 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
`;

export default function ProductDetailLayout() {
  const { isGettingProduct, metadata: product } = UseProductApi.getProductById(
    "65006adda893090c2f08b69d"
  );

  return (
    <ProductDetailLayoutStyled>
      {isGettingProduct && <SpinnerLogo />}
      <BreadcrumbLayout product={product} />
      <HeaderDetailLayout />
      <Hr />
      <BodyDetailLayout>
        <LeftProductDetailLayout />
        <RightProductDetailLayout />
      </BodyDetailLayout>
      <Hr />
      <SameProductLayout />
      <ProductContentLayout />
    </ProductDetailLayoutStyled>
  );
}
