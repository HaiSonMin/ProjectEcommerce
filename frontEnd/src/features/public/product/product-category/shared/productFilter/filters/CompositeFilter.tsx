import { AiFillFilter } from 'react-icons/ai';
import { css, styled } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { IFilterOption } from '@/interfaces/shared';
import { useFilter } from '../context/FilterProvider';
import ItemFilter from './ItemFilter';
import ItemFilterType from './ItemFilterType';
import Heading from '@/components/shared/Heading';
import OptionsSelecting from './OptionsSelecting';
import OptionsFilterBox from './option-filter-box';
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
        content: '${props.$numberOption}';
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
  margin-top: ${(props) => props.$index > 2 && '2rem'};

  & .items-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

interface IProps {
  filterOptions: Array<IFilterOption>;
}

export default function CompositeFilter({ filterOptions }: IProps) {
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
    document.addEventListener('click', handlerDocumentClick);
    return () => document.removeEventListener('click', handlerDocumentClick);
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
              {filterOptions.map((filter, index) => (
                <FilterType $index={index}>
                  <Heading $as='h4'>{filter.filterOption}</Heading>
                  <div className='items-filter'>
                    {filter.filterItems.map((item) => (
                      <ItemFilter
                        optionName={item.itemName}
                        key={item.id}
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
