import {
  ProductBrandsLayout,
  ProductContentLayout,
  ProductHotSaleLayout,
} from '@/components/public/product';
import ProductDealHotLayout from '@/components/public/product/product-deal-hot/ProductDealHotLayout';
import { CarouselImage, SpinnerLogo } from '@/components/shared';
import { styled } from 'styled-components';
import ProductDemandsLayout from './product-demands';
import SortContainer from '../shared/productSort';
import FilterContainer from '../shared/productFilter';
import ProductsCardContainer from '../shared/productsCardContainer';
import { IProductCategory } from '@/interfaces/models/productCategory.interface';
import { UseProductApi } from '@/apis-use';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  addProductsCategory,
  getInfoProductsCategory,
  loadProductsCategory,
} from '@/storeReducer/public/productsCategorySlice';
import { getQueriesString } from '@/utils';
import { useQueriesString } from '@/hooks';

const CategoryOneTypeLayoutStyled = styled.div`
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

interface IProps {
  productCategory: IProductCategory;
}

export default function CategoryOneTypeLayout({ productCategory }: IProps) {
  const dispatch = useDispatch();
  const { category_products } = useSelector(getInfoProductsCategory);
  const { page } = getQueriesString(useQueriesString());

  const { isGettingProducts, metadata } = UseProductApi.getProductsByCategoryId(
    productCategory._id
  );

  useEffect(() => {
    if (!isGettingProducts && metadata && !category_products.length)
      dispatch(
        loadProductsCategory({
          products: metadata.products,
          totalProducts: metadata.totalProducts,
        })
      );
    else if (!isGettingProducts && metadata) {
      dispatch(addProductsCategory(metadata?.products));
    }
  }, [isGettingProducts, page]);

  return (
    <CategoryOneTypeLayoutStyled>
      {isGettingProducts && <SpinnerLogo />}
      <ContainerImage>
        <CarouselImage items={items} />
        <CarouselImage items={items} />
      </ContainerImage>
      <ProductDealHotLayout />
      <ProductBrandsLayout brands={productCategory.productCategory_brands} />
      <ProductDemandsLayout demands={productCategory.productCategory_demands} />
      <FilterContainer
        filtersOptions={JSON.parse(
          productCategory.productCategory_filtersOptions
        )}
      />
      <SortContainer />
      <ProductsCardContainer />
      <ProductHotSaleLayout />
      <ProductContentLayout />
    </CategoryOneTypeLayoutStyled>
  );
}
