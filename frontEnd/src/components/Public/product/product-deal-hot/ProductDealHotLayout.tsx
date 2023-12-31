import ContainerCard from "@/components/shared/ContainerCard";
import { keyframes, styled } from "styled-components";
import { TiFlash } from "react-icons/ti";
import CountDown from "@/components/shared/CountDown";
import { RiTimerFlashLine } from "react-icons/ri";
const ProductDealHotLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  overflow: hidden;
  border-bottom: 1px solid #bbb;
  margin-top: 1rem;
`;

const animationScale = keyframes`
0%   {scale: 1}
50%   {scale: 1.3}
100% {scale: 1}
`;

const DealHotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--color-primary);

  .title {
    display: flex;
    align-items: center;
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

      animation: ${animationScale} 1s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
    }
  }

  .countdown {
    display: flex;
    align-items: center;
    gap: 8px;
    &--title {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 1.6rem;
      color: var(--color-white);
      font-weight: 600;

      svg {
        animation: ${animationScale} 1.75s cubic-bezier(0.66, 0, 0, 1) infinite;
      }
    }
  }
`;

const Background = styled.div`
  background: linear-gradient(180deg, rgb(0, 0, 0, 0.9), rgb(138, 5, 5)) 0% 0% /
    cover;
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

export default function ProductDealHotLayout() {
  return (
    <ProductDealHotLayoutStyled>
      <DealHotHeader>
        <div className="title">
          <span>Deal hot hôm nay</span>
          <TiFlash />
        </div>
        <div className="countdown">
          <div className="countdown--title">
            <RiTimerFlashLine />
            <span>Thời gian còn lại:</span>
          </div>
          <CountDown timeLeft={Date.now() + 10000000} />
        </div>
      </DealHotHeader>
      <Background>
        <ContainerCard
          products={productsDiscounted}
          gapValue={1}
          numberProductDisplayOnScreen={5}
          withCard={23}
        />
      </Background>
    </ProductDealHotLayoutStyled>
  );
}
