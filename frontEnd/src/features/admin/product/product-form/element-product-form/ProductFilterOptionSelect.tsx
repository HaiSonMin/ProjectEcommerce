import { css, styled } from "styled-components";
import { IFilterItem, IFilterOption } from "@/helpers";
import { useState } from "react";
import { fi } from "date-fns/locale";

const ProductOptionStyled = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const OptionsBox = styled.div`
  width: 22rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  overflow: hidden;
  height: max-content;
`;

const OptionName = styled.div`
  padding: 5px 0;
  text-align: center;
  font-weight: 600;
  background-color: var(--color-red-700);
  color: var(--color-white);
`;

const FiltersBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0 5px;
`;

const FilterItem = styled.div<{ $active: boolean }>`
  position: relative;
  width: 90%;
  padding: 4px 0;
  border-radius: 1rem;
  background-color: var(--color-grey-200);
  text-align: center;
  cursor: pointer;
  font-size: 500;
  font-size: 1.2rem;

  ${(props) =>
    props.$active &&
    css`
      &::before {
        position: absolute;
        top: 0;
        width: 15px;
        background-color: var(--color-primary);
        border-radius: 8px 0 10px 0;
        color: var(--color-white);
        content: "✓";
        font-size: 8px;
        height: 10px;
        left: 0px;
        padding-bottom: 12px;
        padding-left: 1px;
      }

      color: var(--color-primary);
      border-color: var(--color-primary);
      background-color: var(--color-red-100);
    `}
`;

interface IProps {
  filtersOptions: Array<IFilterOption> | undefined;
  selectedFilterOptions: Array<IFilterOption>;
  setSelectedFilterOptions: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductFilterOptionSelect({
  filtersOptions,
  selectedFilterOptions,
  setSelectedFilterOptions,
}: IProps) {
  const handlerAddFilterOptions = (
    filterOption: IFilterOption,
    filterItem: IFilterItem
  ) => {
    const newChoseFilterOptions = [...selectedFilterOptions];
    if (!newChoseFilterOptions.length)
      newChoseFilterOptions.push({
        id: filterOption.id,
        filterOption: filterOption.filterOption,
        filterOptionInfo: filterOption.filterOptionInfo,
        filterItems: [filterItem],
      });
    else {
      if (
        !newChoseFilterOptions.find((option) => option.id === filterOption.id)
      )
        newChoseFilterOptions.push({
          id: filterOption.id,
          filterOption: filterOption.filterOption,
          filterOptionInfo: filterOption.filterOptionInfo,
          filterItems: [filterItem],
        });
      else {
        const indexOption: number = newChoseFilterOptions.findIndex(
          (option) => option.id === filterOption.id
        );
        if (
          !newChoseFilterOptions[indexOption].filterItems.find(
            (item) => item.id === filterItem.id
          )
        )
          newChoseFilterOptions[indexOption].filterItems.push(filterItem);
        else {
          const indexItem: number = newChoseFilterOptions[
            indexOption
          ].filterItems.findIndex(
            (item: IFilterItem) => item.id === filterItem.id
          );
          newChoseFilterOptions[indexOption].filterItems.splice(indexItem, 1);
        }
      }
    }
    setSelectedFilterOptions(newChoseFilterOptions);
  };

  return (
    <ProductOptionStyled>
      {filtersOptions?.map((filterOption) => (
        <OptionsBox key={filterOption.id}>
          <OptionName>{filterOption.filterOption}</OptionName>
          <FiltersBox>
            {filterOption.filterItems.map((filterItem) => (
              <FilterItem
                key={filterItem.id}
                $active={selectedFilterOptions.some((option) =>
                  option.filterItems.find((item) => item.id === filterItem.id)
                )}
                onClick={() =>
                  handlerAddFilterOptions(filterOption, filterItem)
                }
              >
                {filterItem.itemName}
              </FilterItem>
            ))}
          </FiltersBox>
        </OptionsBox>
      ))}
    </ProductOptionStyled>
  );
}
