import styled from "styled-components";
import ProductTypeLayout from "./ProductTypeLayout";
import { UseProductCategoryApi } from "@/apis-use";
import { useState, useEffect } from "react";
import { IProductCategory } from "@/interfaces";
import { ContainerCardLoading } from "@/components";
import { randomKey } from "@/utils";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductGroupLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const MAX_RENDER_CATEGORY_TYPE = 10;

export default function ProductGroupLayout() {
  const [maxNumberLoadCategory] = useState<number>(MAX_RENDER_CATEGORY_TYPE);
  const [categoriesType, setCategoriesType] = useState<IProductCategory[]>([]);
  const [limit] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isGettingProductCategories, metadata, statusCode } =
    UseProductCategoryApi.getAllCategories(limit, currentPage);
    
  useEffect(() => {
    const newCategory: IProductCategory[] = metadata?.productCategories || [];
    if (!isGettingProductCategories && statusCode === 200)
      setCategoriesType((prevCategoriesType) => [
        ...prevCategoriesType,
        ...newCategory,
      ]);
  }, [isGettingProductCategories, statusCode, currentPage]);

  const fetchData = () => {
    if (currentPage <= maxNumberLoadCategory)
      setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={categoriesType.length} //This is important field to render the next data
      next={fetchData}
      hasMore={categoriesType.length <= maxNumberLoadCategory}
      loader={
        categoriesType.length <= maxNumberLoadCategory && (
          <ContainerCardLoading />
        )
      }
      scrollThreshold={"45%"}
    >
      <ProductGroupLayoutStyled>
        {categoriesType.map((category) => (
          <ProductTypeLayout category={category} key={randomKey()} />
        ))}
      </ProductGroupLayoutStyled>
    </InfiniteScroll>
  );
}
