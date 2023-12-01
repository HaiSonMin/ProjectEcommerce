import { RiArrowDownSLine } from 'react-icons/ri';
import { styled } from 'styled-components';
import ItemFilterType from './ItemFilterType';
import { useState, useRef, useEffect } from 'react';
import ItemFilter from './ItemFilter';
import OptionsFilterBox from './option-filter-box/OptionsFilterBox';
import { useFilter } from '../context/FilterProvider';
import { IFilterItem, IFilterOption } from '@/interfaces/shared';

const GeneralFilterStyled = styled.div``;

interface IProps {
  filterOption: IFilterOption;
}

export default function GeneralFilter({ filterOption }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayFilterBox, setDisplayFilterBox] = useState<boolean>(false);
  const {
    filtersSelected,
    filtersSelecting,
    handlerAddFilterSelectingCenter,
    handlerRemoveFilterSelectingCenter,
  } = useFilter();

  const isFiltered = filterOption.filterItems.some((filterName) =>
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
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <GeneralFilterStyled ref={ref}>
      <ItemFilterType
        isActive={isFiltered || displayFilterBox}
        onClick={handlerDisplayFilterBox}
      >
        <span>{filterOption.filterOption}</span>
        <RiArrowDownSLine />
        <OptionsFilterBox
          isDisplay={displayFilterBox}
          handlerCloseBox={handlerCloseFilterBox}
          optionSelected={filtersSelecting.some((filterName) =>
            filterOption.filterItems.some(
              (filter) => filter.itemName === filterName
            )
          )}
        >
          {filterOption.filterItems.map((item) => (
            <ItemFilter
              optionName={item.itemName}
              key={item.id}
              addFilter={handlerAddFilter}
              removeFilter={handlerRemoveFilter}
            />
          ))}
        </OptionsFilterBox>
      </ItemFilterType>
    </GeneralFilterStyled>
  );
}
