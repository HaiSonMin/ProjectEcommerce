import { ContainerCard, Heading } from "@/components/shared";
import styled from "styled-components";

const SameProductLayoutStyled = styled.div`
    margin-top: 1rem;
`;

const productsTest = [
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
    title: "Samsung Galaxy Z Fold5 12GB 512GB",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/d/4/d4a672c5-4709-4056-9f7f-72d6d70c2c1d_1.jpg",
    title: "Samsung Galaxy Z Flip5 512GB",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/a/galaxys23ultra_front_green_221122_2.jpg",
    title: "Samsung Galaxy S23 Ultra 256GB",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/_/7/_76666_7__3-3.jpg",
    title: "Xiaomi Redmi Note 12 8GB 128GB",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomblack_211119_2.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/v/_/v_ng_20.png",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_burgundy_211119.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
];

export default function SameProductLayout() {
  return (
    <SameProductLayoutStyled>
      <Heading $as="h4">Sản phẩm tương tự</Heading>
      <ContainerCard
        gapValue={1}
        numberProductDisplayOnScreen={5}
        products={productsTest}
        withCard={23}
      />
    </SameProductLayoutStyled>
  );
}
