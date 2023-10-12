import ContainerCard from "@/components/ContainerCard";
import CountDown from "@/components/CountDown";
import { GiFireworkRocket } from "react-icons/gi";
import { keyframes, styled } from "styled-components";

const ProductHotSaleLayoutStyled = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  border-bottom: 1px solid #bbb;
  margin-top: 2rem;
`;

const animation = keyframes`
0%   {scale: 1}
50%   {scale: 1.3}
100% {scale: 1}
`;

const HotSaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--color-primary);

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;
    & span {
      font-size: 3.4rem;
      text-transform: uppercase;
      color: var(--color-white);
      text-shadow: var(--color-white) 2px 1px 6px;
    }

    & svg {
      width: 4rem;
      height: 4rem;
      color: #eff06b;
      animation: ${animation} 1.75s cubic-bezier(0.66, 0, 0, 1) infinite;
    }
  }
`;

const productsDiscounted = [
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

export default function ProductHotSaleLayout() {
  return (
    <ProductHotSaleLayoutStyled>
      <HotSaleHeader>
        <div className="title">
          <span>Hot sale cuối tuần</span>
          <GiFireworkRocket />
        </div>
        <CountDown hour="" minute="" second="9" />
      </HotSaleHeader>
      <ContainerCard
        products={productsDiscounted}
        gapValue={1}
        numberProductDisplayOnScreen={5}
        withCard={23}
      />
    </ProductHotSaleLayoutStyled>
  );
}
