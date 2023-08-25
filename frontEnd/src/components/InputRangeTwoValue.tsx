import { css, styled } from "styled-components";

const InputRangeValueStyled = styled.div`
  position: relative;
  margin-bottom: 1.6rem;
`;

const Prices = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RangeSlide = styled.div`
  height: 8px;
  position: relative;
  background-color: #e1e9f6;
  border-radius: 2px;
`;

const RangeSelected = styled.span`
  height: 100%;
  position: absolute;
  border-radius: 5px;
  left: 0;
  right: 0;
  background-color: var(--color-primary);
`;

const RangeStyled = css`
  position: absolute;
  width: 100%;
  height: 8px;
  top: 0px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    background-color: #fff;
    pointer-events: auto;
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 3px solid var(--color-primary);
    background-color: #fff;
    pointer-events: auto;
    -moz-appearance: none;
  }

  &:hover::-webkit-slider-thumb {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    outline: none;
  }
`;

const PriceMin = styled.input.attrs({ type: "range" })`
  ${RangeStyled}/* z-index: 2; */
`;

const PriceMax = styled.input.attrs({ type: "range" })`
  ${RangeStyled}/* z-index: 3; */
`;

export default function InputRangeTwoValue() {
  return (
    <InputRangeValueStyled>
      <Prices>
        
      </Prices>
      <RangeSlide>
        <RangeSelected />
      </RangeSlide>
      <PriceMin min={0} max={100} step={1} />
      <PriceMax min={0} max={100} step={1} />
    </InputRangeValueStyled>
  );
}
