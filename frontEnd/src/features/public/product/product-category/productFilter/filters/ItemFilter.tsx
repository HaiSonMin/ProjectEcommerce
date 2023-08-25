import { css, styled } from "styled-components";
import { useState } from "react";
import { useFilter } from "../context/FilterProvider";

const ItemFilterStyled = styled.div<{ $isChose: boolean }>`
  position: relative;
  padding: 6px 12px;
  background-color: var(--color-grey-200);
  border-radius: 1rem;
  border: solid 1px var(--color-grey-300);
  cursor: pointer;
  align-self: flex-start;
  color: var(--color-text);
  overflow: hidden;

  &:hover {
    opacity: 0.8;
  }

  & .active {
    display: none;
    top: 0px;
  }

  ${(props) =>
    props.$isChose &&
    css`
      &::before {
        background-color: var(--color-primary);
        border-radius: 8px 0 10px 0;
        color: #fff;
        content: "✓";
        font-size: 8px;
        height: 10px;
        left: 0px;
        padding-bottom: 12px;
        padding-left: 4px;
        position: absolute;
        top: 0;
        width: 15px;
      }

      color: var(--color-primary);
      border-color: var(--color-primary);
      background-color: var(--color-red-100);
    `}
`;

interface IProps {
  optionName: string;
  addFilter: (optionName: string) => void;
  removeFilter: (optionName: string) => void;
}

export default function ItemFilter({
  optionName,
  addFilter,
  removeFilter,
}: IProps) {
  const { handlerAddFilterSelectingCenter, filtersSelecting } = useFilter();

  const handlerClickItemFilter = () => {
    if (!filtersSelecting.some((filter) => filter === optionName))
      handlerAddFilterSelectingCenter(optionName);
    else removeFilter(optionName);
  };

  return (
    <ItemFilterStyled
      $isChose={filtersSelecting.some((filter) => filter === optionName)}
      onClick={handlerClickItemFilter}
    >
      {optionName}
    </ItemFilterStyled>
  );
}
