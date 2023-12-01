import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import MenuListChildren from './MenuListChildren';
import { PATH_PUBLIC } from '@/constant/path-router';
import IProductCategoryGroup from '@/interfaces/models/productCategoryGroup.interface';

const MenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 5px 5px 5px 10px;
  transition: all 0.3s;
  cursor: pointer;

  & img {
    width: 2.4rem;
    height: 2.4rem;
  }

  & a {
    transition: all 0.3s;
  }

  & a:hover {
    color: var(--color-primary);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const MenuItemContent = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 6px;
  .box-links {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const MenuLink = styled.div`
  cursor: pointer;
  display: inline;
  &:hover {
    color: var(--color-primary);
  }
`;

const IconType = styled.img``;

interface IProps {
  productCategoryGroup: IProductCategoryGroup;
  key: React.Key;
}

export default function MenuItem({ productCategoryGroup }: IProps) {
  const [isDisplayChild, setIsDisplayChild] = useState<boolean>(false);
  const navigate = useNavigate();

  // console.log('productCategoryGroup:::', productCategoryGroup);

  let typeNames = {};
  productCategoryGroup.productCategoryGroup_categoryChildren.forEach(
    (category) => {
      if (!typeNames[category.productCategory_type])
        typeNames[category.productCategory_type] =
          category.productCategory_type;
    }
  );

  const handleNavigate = (categoryType: any) => {
    navigate({
      pathname: PATH_PUBLIC.productCategoryType,
      search: `${createSearchParams({ catType: categoryType })}`,
    });
  };

  return (
    <MenuItemStyled
      onMouseEnter={() => setIsDisplayChild(true)}
      onMouseLeave={() => setIsDisplayChild(false)}
    >
      <MenuItemContent>
        <IconType src={productCategoryGroup.productCategoryGroup_image} />
        <div className='box-links'>
          {Object.keys(typeNames).map((type, i) => (
            <MenuLink onClick={() => handleNavigate(type)} key={type}>
              {type.split(' ')}
              {i !== Object.keys(typeNames).length - 1 && ', '}
            </MenuLink>
          ))}
        </div>
      </MenuItemContent>
      <BiChevronRight />
      <MenuListChildren
        isDisplayChild={isDisplayChild}
        setIsDisplayChild={setIsDisplayChild}
        productCategoryGroup_categoryChildren={
          productCategoryGroup.productCategoryGroup_categoryChildren
        }
      />
    </MenuItemStyled>
  );
}
