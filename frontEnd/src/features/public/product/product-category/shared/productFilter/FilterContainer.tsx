import { styled } from 'styled-components';
import { CompositeFilter, GeneralFilter, PriceFilter } from './filters';
import Heading from '@/components/shared/Heading';
import FilterProvider from './context/FilterProvider';
import OptionsSelected from './filters/option-selected';
import { IFilterOption } from '@/interfaces/shared';

const FilterContainerStyled = styled.div`
  margin-top: 1.6rem;
`;

const BoxFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 6px;
  margin-bottom: 6px;
`;

interface IProps {
  filtersOptions: Array<IFilterOption>;
}

export default function FilterContainer({ filtersOptions }: IProps) {
  return (
    <FilterProvider>
      <FilterContainerStyled>
        <Heading $as='h4'>Lọc theo:</Heading>
        <BoxFilter>
          <CompositeFilter filterOptions={filtersOptions} />
          <PriceFilter
            minPriceProduct={1_000_000}
            maxPriceProduct={10_000_0000}
          />
          {filtersOptions.map((filterOption) => (
            <GeneralFilter key={filterOption.id} filterOption={filterOption} />
          ))}
        </BoxFilter>
        <OptionsSelected />
      </FilterContainerStyled>
    </FilterProvider>
  );
}
