import { styled } from "styled-components";

interface IProps {
  label: string;
  onChange: () => void;
}

const StyledSwitch = styled.label`
  position: relative;
  display: inline-flex;
  width: 5rem;
  height: 2.8rem;
`;

const StyledCheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + .slider {
    background-color: #2196f3;
  }

  &:checked + .slider::before {
    transform: translateX(22px);
  }
`;

const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: 2rem;
    width: 2rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const StyledLabelText = styled.span`
  position: absolute;
  width: 20rem;
  top: 50%;
  left: 6rem;
  transform: translateY(-50%);
  font-size: 14px;
`;

export default function Switch(props: IProps) {
  const handlerChangeSwitch = () => {
    props.onChange();
  };

  return (
    <StyledSwitch>
      <>
        <StyledCheckBox type="checkbox" onChange={handlerChangeSwitch} />
        <StyledSlider className="slider" />
      </>
      <StyledLabelText>{props.label}</StyledLabelText>
    </StyledSwitch>
  );
}
