import { CarouselImage } from "@/components";
import { styled } from "styled-components";
import { ProductContentLayout } from "@/components/public/product";
import ProductsCardContainer from "./productsCardContainer";
import FilterContainer from "./productFilter";
import SortContainer from "./productSort";
import ProductDealHotLayout from "@/components/public/product/product-deal-hot/ProductDealHotLayout";
import ProductDemandsLayout from "./product-demands";
import {
  ProductBrandsLayout,
  ProductHotSaleLayout,
} from "@/components/public/product";

const ProductCategoryLayoutStyled = styled.div`
  padding: 1.5rem 0;
`;

const ContainerImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const items = [
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Lenovo.png",
  },
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image: "https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png",
  },
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image: "https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png",
  },
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image: "https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png",
  },
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image: "https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png",
  },
  {
    linkTo: "#",
    imageName: "Hinh anh 1",
    image: "https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png",
  },
];

export default function ProductCategoryLayout() {
  return (
    <ProductCategoryLayoutStyled>
      <ContainerImage>
        <CarouselImage items={items} />
        <CarouselImage items={items} />
      </ContainerImage>
      <ProductDealHotLayout />
      <ProductBrandsLayout />
      <ProductDemandsLayout />
      <FilterContainer />
      <SortContainer />
      <ProductsCardContainer />
      <ProductHotSaleLayout />
      <ProductContentLayout />
    </ProductCategoryLayoutStyled>
  );
}
