import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { IProduct } from "@/interfaces/models";
import { PATH_PUBLIC } from "@/constant/path-router";
import { IoIosArrowForward } from "react-icons/io";

const BreadcrumbLayoutStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 1rem;
`;

const ItemBreadcrumb = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-text);

  .breadcrumb--name {
    font-size: 1.2rem;
    font-weight: 500;
  }

  & .icon--home {
    margin-bottom: 2px;
    color: var(--color-primary);
  }

  & svg:last-child {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-500);
    margin-left: 8px;
  }
`;

const ItemBreadcrumbProductName = styled.div`
  font-size: 1.2rem;
  color: var(--color-text);
`;

interface IProps {
  product?: IProduct;
}

export default function BreadcrumbLayout({ product }: IProps) {
  return (
    <BreadcrumbLayoutStyled>
      <ItemBreadcrumb to={`${PATH_PUBLIC.home}`}>
        <HiMiniHome className="icon--home" />
        <span className="breadcrumb--name">Trang chủ</span>
        <IoIosArrowForward />
      </ItemBreadcrumb>
      {product?.product_category.productCategory_name ===
      product?.product_category.productCategory_type ? (
        <ItemBreadcrumb to={`/${PATH_PUBLIC.productCategory}`}>
          <span className="breadcrumb--name">
            {product?.product_category.productCategory_name}
          </span>
          <IoIosArrowForward />
        </ItemBreadcrumb>
      ) : (
        <>
          <ItemBreadcrumb to={`/${PATH_PUBLIC.home}`}>
            <span className="breadcrumb--name">
              {product?.product_category.productCategory_type}
            </span>
            <IoIosArrowForward />
          </ItemBreadcrumb>
          <ItemBreadcrumb to={`/${PATH_PUBLIC.home}`}>
            <span className="breadcrumb--name">
              {product?.product_category.productCategory_name}
            </span>
            <IoIosArrowForward />
          </ItemBreadcrumb>
        </>
      )}
      <ItemBreadcrumb to={"#"}>
        <span className="breadcrumb--name">
          {product?.product_brand.brand_name}
        </span>
        <IoIosArrowForward />
      </ItemBreadcrumb>
      <ItemBreadcrumbProductName>
        <span className="breadcrumb--name">{product?.product_name}</span>{" "}
        <span className="breadcrumb--name">
          {product?.product_options[0].product_optionName}
        </span>
      </ItemBreadcrumbProductName>
    </BreadcrumbLayoutStyled>
  );
}
