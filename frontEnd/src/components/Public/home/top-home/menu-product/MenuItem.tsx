import { styled } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { IProductCategoryGroup } from "@/interfaces/models";
import MenuListChildren from "./MenuListChildren";
import { PATH_PUBLIC } from "@/constant/path-router";
// import { PATH_PUBLIC } from "@/constant/path-router";

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
  & div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const MenuLink = styled(Link)`
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

  const typeNames = {};

  productCategoryGroup.productCategoryGroup_categoryChildren.forEach(
    (category) => {
      if (!typeNames[category.productCategory_type])
        typeNames[category.productCategory_type] =
          category.productCategory_type;
    }
  );

  return (
    <MenuItemStyled
      onMouseEnter={() => setIsDisplayChild(true)}
      onMouseLeave={() => setIsDisplayChild(false)}
    >
      <MenuItemContent>
        <IconType src={productCategoryGroup.productCategoryGroup_image} />
        <div>
          {Object.keys(typeNames).map((type, i) => (
            <MenuLink to={PATH_PUBLIC.productCategory} key={type}>
              {type.split(" ")}
              {i !== Object.keys(typeNames).length - 1 && ", "}
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
