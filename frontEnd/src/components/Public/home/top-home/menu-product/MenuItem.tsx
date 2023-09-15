import { css, styled } from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { BiChevronRight } from "react-icons/bi";
import { IProductCategoryGroup } from "@/interfaces";
import UseProductCategoryApi from "@/features/admin/productCategory/UseProductCategoryApi";
import { removeSpaceString } from "@/utils";

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

const MenuLink = styled(Link)``;

const CategoryLink = styled(Link)``;

const MenuListChild = styled.div<{ $display: boolean }>`
  ${(props) => css`
    display: ${props.$display ? "flex" : "none"};
  `}
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #fff;
  border-radius: 1rem 1rem 1rem 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 3rem;
  min-height: 37.5rem;
  padding: 1rem 2rem;
  width: 100rem;
  min-height: calc(100% + 10rem);
  z-index: 100;

  & .type {
    display: flex;
    flex-direction: column;
    min-width: 20%;
    font-size: 1.4rem;

    & .type-header {
      display: flex;
      align-items: center;
      gap: 8px;

      .type-header--seeall {
        color: var(--color-primary);
        display: flex;
        align-items: center;
        gap: 4px;
        & svg {
          width: 1.8rem;
          height: 1.8rem;
        }
      }
    }

    & .type-category {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: 500;
      color: var(--color-text);
    }
  }
`;

const IconType = styled.img``;

interface IProps {
  productCategoryGroup: IProductCategoryGroup;
  key: React.Key;
}

export default function MenuItem({ productCategoryGroup }: IProps) {
  const [isDisplayChild, setIsDisplayChild] = useState<boolean>(false);

  const { metadata } = UseProductCategoryApi.getCategoriesByGroupId(
    productCategoryGroup?._id
  );

  const transformedData: {
    [key: string]: Array<{ [key: string]: Array<string> }>;
  } =
    metadata?.reduce((result, category) => {
      const {
        productCategory_type,
        productCategory_name,
        productCategory_demands,
        productCategory_brands,
      } = category;

      const categoryType: string = productCategory_type || "";

      if (!result[categoryType]) {
        result[categoryType] = {};
      }

      result[categoryType][productCategory_name] = productCategory_demands?.map(
        (demand: any) => demand.demand_name
      );
      result[categoryType]["productCategory_brands"] =
        productCategory_brands?.map((brand: any) => brand.brand_name);

      return result;
    }, {}) || {};

  const keyTypes = Object.keys(transformedData).slice(0, 3);

  return (
    <MenuItemStyled
      onMouseEnter={() => setIsDisplayChild(true)}
      onMouseLeave={() => setIsDisplayChild(false)}
    >
      <MenuItemContent>
        <IconType src={productCategoryGroup.productCategoryGroup_image} />
        <div>
          {keyTypes.map((type, i) => (
            <MenuLink to={"product"} key={type}>
              {type.split(" ")}
              {i !== keyTypes.length - 1 && ", "}
            </MenuLink>
          ))}
        </div>
      </MenuItemContent>
      <BiChevronRight />
      <MenuListChild
        $display={isDisplayChild}
        onMouseLeave={() => setIsDisplayChild(false)}
      >
        {Object.entries(transformedData).map((item) => (
          <aside className="type">
            <div className="type-header">
              <p>{item[0]}</p>
              {Object.keys(item[1]).length <= 2 && (
                <Link className="type-header--seeall" to={"#"}>
                  <span>See all</span>
                  <HiArrowLongRight />
                </Link>
              )}
            </div>
            <hr className="mb-3 mt-2 " />
            <div className="type-category">
              {Object.keys(item[1]).length <= 2 ? (
                // Brands
                <>
                  {item[1][Object.keys(item[1])[1]]
                    .slice(0, 7)
                    .map((brandLink: string) => (
                      <CategoryLink
                        to={`${removeSpaceString(
                          item[0]
                        ).toLocaleLowerCase()}/${removeSpaceString(
                          brandLink
                        ).toLocaleLowerCase()}`}
                      >
                        {brandLink}
                      </CategoryLink>
                    ))}
                  {/* Brands.length < 7 */}
                  {item[1][Object.keys(item[1])[1]].length <= 10 &&
                    Object.keys(transformedData).length <= 4 &&
                    item[1][Object.keys(item[1])[0]].map(
                      (demandLink: string) => (
                        <CategoryLink
                          to={`${removeSpaceString(
                            item[0]
                          ).toLocaleLowerCase()}/${removeSpaceString(
                            demandLink
                          ).toLocaleLowerCase()}`}
                        >
                          {item[0]} {demandLink}
                        </CategoryLink>
                      )
                    )}
                </>
              ) : (
                // Demands
                Object.keys(item[1]).map(
                  (demandLink: string) =>
                    demandLink !== "productCategory_brands" && (
                      <CategoryLink
                        to={`${removeSpaceString(
                          item[0]
                        ).toLocaleLowerCase()}/${removeSpaceString(
                          demandLink
                        ).toLocaleLowerCase()}`}
                      >
                        {demandLink}
                      </CategoryLink>
                    )
                )
              )}
            </div>
          </aside>
        ))}
      </MenuListChild>
    </MenuItemStyled>
  );
}
