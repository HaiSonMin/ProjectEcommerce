import Heading from "./Heading";
import { css, styled } from "styled-components";
import IFilterOption from "@/helpers/IFilterOption";
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
  color: #fff;
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
        color: #fff;
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

// [{ filterName: "Màng hình", filterItem: ["Đục lỗ","Nốt ruồi","Dynamic Island"] }];
interface IProps {
  filtersOptions: Array<IFilterOption> | undefined;
  choseFilterOptions: Array<IFilterOption>;
  setChoseFilterOptions: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductFilterOptionSelect({
  filtersOptions,
  choseFilterOptions,
  setChoseFilterOptions,
}: IProps) {
  const [filtersActive, setFiltersActive] = useState<Array<string>>([]);

  const handlerAddFilterOptions = (filterOptionId, filterItem) => {
    if (!filtersActive.includes(filterItem.id)) {
      const filters = [...filtersActive, filterItem.id];
      setFiltersActive(filters);
    } else {
      const filters = filtersActive.filter(
        (filter) => filter !== filterItem.id
      );
      setFiltersActive(filters);
    }

    console.log(
      choseFilterOptions?.find(
        (filterOption) => filterOption.id === filterOptionId
      )
    );
    if (
      choseFilterOptions?.find(
        (filterOption) => filterOption.id === filterOptionId
      ) &&
      choseFilterOptions?.find(
        (filterOption) => filterOption.filterItems.find(item => item.id === filterItem.id) 
      )
    ) {
      return;
    }
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
                $active={filtersActive.includes(filterItem.id)}
                onClick={() =>
                  handlerAddFilterOptions(filterOption.id, filterItem)
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
