import { Heading, RatingStar } from '@/components/shared';
import { getStateProductDetail } from '@/storeReducer/public/productDetailSlice';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const HeaderDetailLayoutStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
`;

const NumberRating = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);

  span {
    font-weight: 600;
  }
`;

export default function HeaderDetailLayout() {
  const { product, optionChose } = useSelector(getStateProductDetail);
  return (
    <HeaderDetailLayoutStyled>
      <Heading $as='h4'>
        {product?.product_name}{' '}
        {product?.product_options[optionChose].product_optionName}
      </Heading>
      <RatingStar ratePoint={5} />
      <NumberRating>
        <span>{product?.product_ratings.length}</span> đánh giá
      </NumberRating>
    </HeaderDetailLayoutStyled>
  );
}
