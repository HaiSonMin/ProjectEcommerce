import Banner from "./banner/Banner";
import TopHomeLayout from "./top-home";
import { styled } from "styled-components";
import CategoryLayout from "./categories-hot";
import { ProductHotSaleLayout } from "../product";
import OutstandingLayoutOfferLayout from "./outstanding-offer";
import ProductDealHotLayout from "../product/product-deal-hot/ProductDealHotLayout";
import ProductGroupLayout from "./product";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HomeLayoutStyled = styled.div`
  margin-top: 1rem;
`;

export default function HomeLayout() {
  const [refViewCategoryLayout, inViewCategoryLayout] = useInView({
    threshold: 0,
  });

  // useEffect(() => {}, [inViewCategoryLayout]);

  return (
    <HomeLayoutStyled>
      {/* Top */}
      <TopHomeLayout />
      {/* Banner */}
      <Banner />
      <ProductDealHotLayout />
      {/* product */}
      <ProductGroupLayout />
      <ProductHotSaleLayout />
      <OutstandingLayoutOfferLayout />
      <div ref={refViewCategoryLayout}>
        {inViewCategoryLayout && <CategoryLayout />}
      </div>
    </HomeLayoutStyled>
  );
}
