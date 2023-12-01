import {
  ProductBrandsLayout,
  ProductContentLayout,
  ProductHotSaleLayout,
} from '@/components/public/product';
import ProductDealHotLayout from '@/components/public/product/product-deal-hot/ProductDealHotLayout';
import { CarouselImage } from '@/components/shared';
import { styled } from 'styled-components';
import SortContainer from '../shared/productSort';
import FilterContainer from '../shared/productFilter';
import ProductsCardContainer from '../shared/productsCardContainer';

const CategoryLayoutStyled = styled.div`
  padding: 1.5rem 0;
`;

const ContainerImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const items = [
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image:
      'https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Lenovo.png',
  },
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image: 'https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png',
  },
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image: 'https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png',
  },
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image: 'https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png',
  },
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image: 'https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png',
  },
  {
    linkTo: '#',
    imageName: 'Hinh anh 1',
    image: 'https://cdn.tgdd.vn/2023/08/banner/800-200-800x200-46.png',
  },
];

export default function CategoryLayout() {
//   return (
//     <CategoryLayoutStyled>
//       <ContainerImage>
//         <CarouselImage items={items} />
//         <CarouselImage items={items} />
//       </ContainerImage>
//       <ProductDealHotLayout />
//       <ProductBrandsLayout />
//       <FilterContainer />
//       <SortContainer />
//       <ProductsCardContainer />
//       <ProductHotSaleLayout />
//       <ProductContentLayout />
//     </CategoryLayoutStyled>
//   );
}
