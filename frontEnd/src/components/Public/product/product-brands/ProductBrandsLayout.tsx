import {IBrand} from '@/interfaces/models/brand.interface';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const ProductBrandsLayoutStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
`;

const BrandItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 1rem;
  background-color: var(--color-white);
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  width: 11rem;

  & img {
    height: 20px;
    width: 100%;
    object-fit: contain;
    object-position: center;
    transition: all 0.3s;
  }

  &:hover {
    img {
      scale: 1.1;
    }
  }
`;

interface IProps {
  brands: Array<IBrand>;
}

export default function ProductBrandsLayout({ brands }: IProps) {
  return (
    <ProductBrandsLayoutStyled>
      {brands.map((brand) => (
        <BrandItem key={brand._id} to={''}>
          <img src={brand.brand_image} alt={brand.brand_name} />
        </BrandItem>
      ))}
    </ProductBrandsLayoutStyled>
  );
}
