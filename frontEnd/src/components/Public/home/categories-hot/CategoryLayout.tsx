import { useEffect, useState } from "react";
import { UseProductCategoryApi } from "@/apis-use";
import Carousel from "@/components/Carousel";
import { Link } from "react-router-dom";
import { css, styled } from "styled-components";
import { randomKey } from "@/utils";
import { InView } from "react-intersection-observer";
import { IProductCategory } from "@/interfaces";

const accessories = [
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Dán màng hình",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
  },
  {
    title: "Ốp lưng - Bao da",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-108.svg",
  },
  {
    title: "Cáp sạt",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-114.svg",
  },
  {
    title: "Pin dự phòng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-122.svg",
  },
  {
    title: "Thiết bị mạng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
];

const CategoryLayoutStyled = styled.div`
  box-shadow: var(--shadow-lg);
  border-radius: 1rem;
  overflow: hidden;
  border-bottom: 1px solid #bbb;
  margin-top: 2rem;
`;

// All withCard + all with Gap(1rem)

const CategoryHeader = styled.div`
  padding: 1rem 0;
  text-align: center;
  background-color: var(--color-primary);

  & span {
    font-size: 3.4rem;
    text-transform: uppercase;
    color: #fff;
    text-shadow: #fff 2px 1px 6px;
  }
`;

const CategoryBody = styled.div<{ $paddingX: number }>`
  padding: 2rem ${(props) => props.$paddingX}rem;
`;

const CategoryList = styled.div<{
  $withItem: number;
  $gap: number;
  $numberItems: number;
}>`
  display: flex;
  gap: ${(props) => props.$gap}rem;
  flex-wrap: wrap;
  width: ${(props) => {
    return css`
      ${(props.$withItem * props.$numberItems) / 2 +
      props.$gap * (props.$numberItems / 2)}rem
    `;
  }};
`;

const CategoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 12rem;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-text);
  border-radius: 1rem;
  box-shadow: var(--shadow-around);
  overflow: hidden;

  & .category--box-image {
    width: 100%;
    height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    background-color: var(--color-secondary);

    & img {
      aspect-ratio: 2/1;
      object-fit: contain;
      object-position: center;
      mix-blend-mode: multiply;
      transition: all 0.3s;
    }
  }

  & .category--name {
    padding: 0 4px;
    font-weight: 600;
  }

  &:hover {
    & img {
      scale: 1.1;
    }
  }
`;

export default function CategoryLayout() {
  // const [categories, setCategories] = useState<Array<IProductCategory>>([]);
  const [limit] = useState(30);
  const { isGettingProductCategories, metadata } =
    UseProductCategoryApi.getCategoriesHightLight(limit);

  // useEffect(() => {
  //   const dataCategories = metadata?.productCategories || [];
  //   if (!isGettingProductCategories) setCategories(dataCategories);
  // }, [isGettingProductCategories]);

  if (isGettingProductCategories) return;

  return (
    <CategoryLayoutStyled>
      <CategoryHeader>
        <span>Danh mục nổi bật</span>
      </CategoryHeader>
      <CategoryBody $paddingX={2.5}>
        <Carousel
          gapValue={5}
          numberProductDisplayOnScreen={10}
          numberProductInRow={15}
          widthItem={12}
          paddingX={2.5}
        >
          <CategoryList
            $gap={5}
            $withItem={12}
            $numberItems={metadata?.productCategories?.length || limit}
          >
            {metadata?.productCategories?.map((category) => (
              <CategoryItem
                key={randomKey()}
                to={category.productCategory_name
                  .toLowerCase()
                  .replace(/[, ]+/g, "-")}
              >
                <div className="category--box-image">
                  <img src={category.productCategory_image} />
                </div>
                <span className="category--name">
                  {category.productCategory_name.split(",")[0]}
                </span>
              </CategoryItem>
            ))}
          </CategoryList>
        </Carousel>
      </CategoryBody>
    </CategoryLayoutStyled>
  );
}
