import { Card } from '@/components/shared';
import { KEY_QUERY } from '@/constant';
import { useQueriesString } from '@/hooks';
import { IProduct } from '@/interfaces/models/product.interface';
import { getInfoProductsCategory } from '@/storeReducer/public/productsCategorySlice';
import { useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

const ProductsCategoryContainerStyled = styled.div`
  margin-top: 2.5rem;
`;

const BoxCardProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const LoadMore = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 2rem auto 0;
  padding: 8px 5rem;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-around);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
    outline: 1px solid var(--color-primary);
    background-color: var(--color-red-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

export default function ProductsCardContainer() {
  const {
    category_products,
    category_totalProducts,
    category_numberShowProduct,
  } = useSelector(getInfoProductsCategory);

  const [searchParams, setSearchParams] = useSearchParams();
  const queriesString = useQueriesString();
  const currentPage: number = Number(queriesString?.page) || 1;
  const handleLoadMore = () => {
    searchParams.set(KEY_QUERY.PAGE, `${currentPage + 1}`);
    setSearchParams(searchParams);
  };

  return (
    <ProductsCategoryContainerStyled>
      <BoxCardProduct>
        {category_products.map((product) => (
          <Card key={product.product_name} width={23} item={product} />
        ))}
      </BoxCardProduct>
      {category_numberShowProduct !== category_totalProducts && (
        <LoadMore onClick={handleLoadMore}>
          <span>
            Xem thêm {category_totalProducts - category_numberShowProduct} sản
            phẩm
          </span>
          <MdOutlineFileDownload />
        </LoadMore>
      )}
    </ProductsCategoryContainerStyled>
  );
}
