import styled, { css } from "styled-components";
import ReactSlider from "react-slider";
import { useRef, useState } from "react";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 8px;
  margin-bottom: 2rem;
`;

const StyledThumb = styled.div`
  height: 16px;
  width: 16px;
  background-color: #fff;
  outline: 2px solid var(--color-primary);
  color: black;
  border-radius: 50%;
  &:not(:active) {
    transition: all 0.3s;
  }
  cursor: grab;
`;

const StyledTrack = styled.div<{ $index: number; $onMouseThumb: boolean }>`
  top: 4px;
  bottom: -4px;
  background: ${(props) =>
    props.$index === 2
      ? "var(--color-grey-200)"
      : props.$index === 1
      ? "var(--color-primary)"
      : "var(--color-grey-200)"};
  border-radius: 1rem;
  ${(props) =>
    !props.$onMouseThumb &&
    css`
      transition: all 0.3s;
    `}
  cursor: pointer;
`;

interface IProps {
  minPrice: number;
  maxPrice: number;
  values: Array<number>;
  setValues: React.Dispatch<React.SetStateAction<Array<number>>>;
}

export default function InputRangeTwoValueV2({
  minPrice,
  maxPrice,
  values,
  setValues,
}: IProps) {
  const ref = useRef();
  const [onMouseThumb, setOnMouseThumb] = useState<boolean>(false);

  const Thumb = (props, state) => (
    <StyledThumb
      onMouseEnter={() => setOnMouseThumb(true)}
      onMouseLeave={() => setOnMouseThumb(false)}
      {...props}
    />
  );

  const Track = (props, state) => (
    <StyledTrack {...props} $index={state.index} $onMouseThumb={onMouseThumb} />
  );

  return (
    <StyledSlider
      defaultValue={[minPrice, maxPrice]}
      onChange={setValues}
      renderTrack={Track}
      renderThumb={Thumb}
      value={values}
      min={minPrice}
      max={maxPrice}
    />
  );
}
