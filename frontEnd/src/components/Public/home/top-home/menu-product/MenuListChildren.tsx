import { IProductCategoryGroupChildren } from "@/interfaces/models/productCategoryGroup.interface";
import { randomKey, removeSpaceString } from "@/utils";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const MenuListChildStyled = styled.div<{ $display: boolean }>`
  ${(props) => css`
    display: ${props.$display ? "flex" : "none"};
  `}
  position: absolute;
  top: 0;
  left: 100%;
  background-color: var(--color-white);
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

interface IProps {
  isDisplayChild: boolean;
  setIsDisplayChild: any;
  productCategoryGroup_categoryChildren: Array<IProductCategoryGroupChildren>;
}

export default function MenuListChildren({
  isDisplayChild,
  setIsDisplayChild,
  productCategoryGroup_categoryChildren,
}: IProps) {
  const transformedData: {
    [key: string]: Array<{ [key: string]: Array<string> }>;
  } = productCategoryGroup_categoryChildren.reduce((acc, categoryChildren) => {
    const {
      productCategory_name,
      productCategory_type,
      productCategory_brands,
      productCategory_demands,
    } = categoryChildren;

    if (!acc[productCategory_type]) acc[productCategory_type] = {};

    acc[productCategory_type][productCategory_name] =
      productCategory_demands.map((demand) => demand.demand_name);

    acc[productCategory_type]["brands"] = productCategory_brands.map(
      (brand) => brand.brand_name
    );

    return acc;
  }, {});

  return (
    <MenuListChildStyled
      $display={isDisplayChild}
      onMouseLeave={() => setIsDisplayChild(false)}
    >
      {Object.entries(transformedData).map((item) => {
        const categoryType: string = item[0];
        // option1: {CategoryName:["demand1","demand"], brands: ["Apple", "Samsung"]}
        // option2: {CategoryName1:[""],CategoryName2:[""], brands: ["Apple", "Samsung"]}
        const options: any = item[1];
        return (
          <aside className="type" key={randomKey()}>
            <div className="type-header">
              <p>{categoryType}</p>
              {Object.keys(options).length <= 2 && (
                <Link className="type-header--seeall" to={"#"}>
                  <span>See all</span>
                  <HiArrowLongRight />
                </Link>
              )}
            </div>
            <hr className="mb-3 mt-2 " />
            <div className="type-category">
              {Object.keys(options).length <= 2 ? (
                // CategoryName & CategoryType trùng nhau => render brand
                <>
                  {options["brands"].slice(0, 7).map((brandLink: string) => (
                    <Link
                      key={randomKey()}
                      to={`${removeSpaceString(
                        item[0]
                      ).toLocaleLowerCase()}/${removeSpaceString(
                        brandLink
                      ).toLocaleLowerCase()}`}
                    >
                      {brandLink}
                    </Link>
                  ))}
                  {/* if keys of transformedData <=4 => render more demand */}
                  {options["brands"].length <= 10 &&
                    Object.keys(transformedData).length <= 4 &&
                    options[Object.keys(options)[0]].map(
                      (demandLink: string) => (
                        <Link
                          key={randomKey()}
                          to={`${removeSpaceString(
                            item[0]
                          ).toLocaleLowerCase()}/${removeSpaceString(
                            demandLink
                          ).toLocaleLowerCase()}`}
                        >
                          {item[0]} {demandLink}
                        </Link>
                      )
                    )}
                </>
              ) : (
                // Demands
                Object.keys(options).map(
                  (demandLink: string) =>
                    demandLink !== "brands" && (
                      <Link
                        key={randomKey()}
                        to={`${removeSpaceString(
                          item[0]
                        ).toLocaleLowerCase()}/${removeSpaceString(
                          demandLink
                        ).toLocaleLowerCase()}`}
                      >
                        {demandLink}
                      </Link>
                    )
                )
              )}
            </div>
          </aside>
        );
      })}
    </MenuListChildStyled>
  );
}
