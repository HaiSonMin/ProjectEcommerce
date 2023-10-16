import { useState, useEffect, useRef } from "react";
import { css, styled } from "styled-components";
import { AiFillFilter } from "react-icons/ai";
import ItemFilterType from "./ItemFilterType";
import OptionsFilterBox from "./OptionsFilterBox";
import { useFilter } from "../context/FilterProvider";
import Heading from "@/components/shared/Heading";
import ItemFilter from "./ItemFilter";
import OptionsSelecting from "./OptionsSelecting";
const CompositeFilterStyled = styled.div<{ $numberOption: number }>`
  position: relative;
  &::before {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    ${(props) =>
      props.$numberOption > 0 &&
      css`
        content: "${props.$numberOption}";
      `}
    top: -6px;
    right: 0;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    font-size: 1.2rem;
    font-weight: 600;
    background-color: var(--color-primary);
    color: var(--color-white);
    z-index: 1;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FilterType = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 33.3333%;
  margin-top: ${(props) => props.$index > 2 && "2rem"};

  & .items-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

interface IProps {
  filters: Array<{ filterType: string; filterOptions: Array<string> }>;
}

export default function CompositeFilter({ filters }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayFilterBox, setDisplayFilterBox] = useState<boolean>(false);
  const {
    filtersSelected,
    filtersSelecting,
    handlerAddFilterSelectingCenter,
    handlerRemoveFilterSelectingCenter,
  } = useFilter();
  const isFiltered = filtersSelected.length > 0;

  const handlerDisplayFilterBox = () => {
    setDisplayFilterBox(!displayFilterBox);
  };

  const handlerCloseFilterBox = () => {
    setDisplayFilterBox(false);
  };

  const handlerDocumentClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      handlerCloseFilterBox();
  };

  useEffect(() => {
    document.addEventListener("click", handlerDocumentClick);
    return () => document.removeEventListener("click", handlerDocumentClick);
  }, []);

  return (
    <CompositeFilterStyled ref={ref} $numberOption={filtersSelecting.length}>
      <ItemFilterType
        onClick={handlerDisplayFilterBox}
        isActive={isFiltered || displayFilterBox}
      >
        <AiFillFilter />
        <span>Bộ lọc</span>
        {displayFilterBox && (
          <OptionsFilterBox
            minWidth={100}
            isDisplay={displayFilterBox}
            handlerCloseBox={handlerCloseFilterBox}
            optionSelected={filtersSelecting.length > 0}
          >
            {/*  */}
            <OptionsSelecting />
            {/*  */}
            <FilterGroup>
              {filters.map((filter, index) => (
                <FilterType $index={index}>
                  <Heading $as="h4">{filter.filterType}</Heading>
                  <div className="items-filter">
                    {filter.filterOptions.map((optionName) => (
                      <ItemFilter
                        optionName={optionName}
                        key={optionName}
                        addFilter={handlerAddFilterSelectingCenter}
                        removeFilter={handlerRemoveFilterSelectingCenter}
                      />
                    ))}
                  </div>
                </FilterType>
              ))}
            </FilterGroup>
          </OptionsFilterBox>
        )}
      </ItemFilterType>
    </CompositeFilterStyled>
  );
}
