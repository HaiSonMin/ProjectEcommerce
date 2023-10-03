/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: var(--color-white);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface IProps {
  filterField: string;
  options: Array<{ value: string; label: string }>;
}

const Filter = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams =
    searchParams.get(props.filterField) || props.options.at(0)?.value;
  // Click to handler
  function handlerClick(value: any) {
    // Set Page === 1 when click filter
    if (searchParams.get("page")) searchParams.set("page", "1");
    searchParams.set(props.filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {props.options.map((option: any) => (
        <FilterButton
          key={option.value}
          onClick={() => handlerClick(option.value)}
          $active={currentParams === option.value}
          disabled={currentParams === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
