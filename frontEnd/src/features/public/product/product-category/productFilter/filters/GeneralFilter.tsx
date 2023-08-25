import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { styled } from "styled-components";
import ItemFilterType from "./ItemFilterType";
import { useState, useRef, useEffect } from "react";
import ItemFilter from "./ItemFilter";
import OptionsFilterBox from "./OptionsFilterBox";
import { useFilter } from "../context/FilterProvider";

const GeneralFilterStyled = styled.div``;

interface IProps {
  filter: { filterType: string; filterOptions: Array<string> };
}

export default function GeneralFilter({ filter }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayFilterBox, setDisplayFilterBox] = useState<boolean>(false);
  const {
    filtersSelected,
    filtersSelecting,
    handlerAddFilterSelectingCenter,
    handlerRemoveFilterSelectingCenter,
  } = useFilter();

  const isFiltered = filter.filterOptions.some((filterName) =>
    filtersSelected.some((filtered) => filtered === filterName)
  );

  const handlerAddFilter = (filterName: string) => {
    handlerAddFilterSelectingCenter(filterName);
  };

  const handlerRemoveFilter = (filterName: string) => {
    handlerRemoveFilterSelectingCenter(filterName);
  };

  const handlerDisplayFilterBox = (e: React.MouseEvent<HTMLElement>) => {
    if (ref.current && ref.current.contains(e.target as Node))
      setDisplayFilterBox(!displayFilterBox);
  };

  const handlerCloseFilterBox = () => {
    setDisplayFilterBox(false);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      handlerCloseFilterBox();
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <GeneralFilterStyled ref={ref}>
      <ItemFilterType
        isActive={isFiltered || displayFilterBox}
        onClick={handlerDisplayFilterBox}
      >
        <span>{filter.filterType}</span>
        {/* {!displayFilterBox ? <RiArrowUpSLine /> : <RiArrowDownSLine />} */}
        <RiArrowDownSLine />
        <OptionsFilterBox
          isDisplay={displayFilterBox}
          handlerCloseBox={handlerCloseFilterBox}
          optionSelected={filtersSelecting.some((filterName) =>
            filter.filterOptions.some((filter) => filter === filterName)
          )}
        >
          {filter.filterOptions.map((optionName) => (
            <ItemFilter
              optionName={optionName}
              key={optionName}
              addFilter={handlerAddFilter}
              removeFilter={handlerRemoveFilter}
            />
          ))}
        </OptionsFilterBox>
      </ItemFilterType>
    </GeneralFilterStyled>
  );
}
