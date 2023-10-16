import { UseProductApi, UseProductCategoryApi } from "@/apis-use";
import { ContainerCard } from "@/components/shared";
const products = [
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
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/a/samsung-galaxy-20-fe_4_.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/s/a/samsung_galaxy_z_flip_m_i_2022-1_1.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/t/gtt_7766_3__1.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/i/p/iphone-14-storage-select-202209-6-1inch-y889.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_12.png",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/t/gtt7766.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/_/1_252.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/p/h/photo_2022-09-28_21-58-51_4.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/o/n/oneplus-nord-3.png",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_51_1_7.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
  {
    img: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/x/i/xiaomi-12t-den_1.jpg",
    title: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
    priceDiscount: 12500240,
    priceOld: 15000890,
    rating: 4,
    discountValue: 12,
  },
];

interface IProps {
  categoryId: any;
}

export default function ProductTypeContainerCard({ categoryId }: IProps) {
  return (
    <ContainerCard
      products={products}
      gapValue={1}
      numberProductDisplayOnScreen={5}
      withCard={23}
    />
  );
}
