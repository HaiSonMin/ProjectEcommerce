import { styled } from "styled-components";
import Heading from "@/components/Heading";
import {
  SortByRelease,
  SortByViewMore,
  SortByPriceMaxToMin,
  SortByPriceMinToMax,
  SortByDiscountPercentage,
} from "./sorts";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SORT_CONSTANTS from "./constant";
import StyledItemSort from "./StyledItemSort";

const SortContainerStyled = styled.div`
  margin-top: 1.6rem;
`;

const BoxSort = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 6px;
`;

export default function SortContainer() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerSetSort = (sortParam: string, value: string) => {
    searchParams.set(sortParam, value);
    setSearchParams(searchParams);
  };

  console.log(searchParams.get("sort"));

  return (
    <SortContainerStyled>
      <Heading $as="h4">Sắp xếp thep:</Heading>
      <BoxSort>
        {SORT_CONSTANTS.map((sortItem) => (
          <StyledItemSort
            key={sortItem.label}
            active={sortItem.value === searchParams.get("sort")}
            handlerSetSort={() => handlerSetSort("sort", sortItem.value)}
          >
            {sortItem.icon}
            <span>{sortItem.label}</span>
          </StyledItemSort>
        ))}
      </BoxSort>
    </SortContainerStyled>
  );
}
