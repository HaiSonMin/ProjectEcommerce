import { styled } from 'styled-components';
import LeftProductDetailLayout from './left-detail';
import RightProductDetailLayout from './right-detail';
import HeaderDetailLayout from './header-detail';
import { Hr, SpinnerLogo } from '@/components/shared';
import BreadcrumbLayout from './breadcrumb';
import { UseProductApi } from '@/apis-use';
import SameProductLayout from './same-product';
import { ProductContentLayout } from '@/components/public/product';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useURLSearchParams } from '@/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProductDetail } from '@/storeReducer/public/productDetailSlice';

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
  const { search } = useLocation();
  const { id } = useURLSearchParams(search);
  const dispatch = useDispatch();

  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById(id);

  useEffect(() => {
    if (!isGettingProduct && product) dispatch(loadProductDetail({ product }));
  }, [isGettingProduct]);

  if (isGettingProduct) return <SpinnerLogo />;

  return (
    <ProductDetailLayoutStyled>
      <BreadcrumbLayout />
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
