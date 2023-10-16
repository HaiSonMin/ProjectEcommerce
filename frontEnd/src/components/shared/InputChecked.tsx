import { BsCheckCircleFill } from "react-icons/bs";
import styled, { css } from "styled-components";

const InputCheckedStyled = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
`;

const CycleChose = styled.div<{ $isChose: boolean; $size?: string }>`
  position: relative;
  border: 1px solid var(--color-grey-500);
  border-radius: 50%;
  ${(props) =>
    props.$size &&
    css`
      height: ${props.$size};
      width: ${props.$size};
    `}

  ${(props) =>
    props.$isChose &&
    css`
      border-color: var(--color-primary);
      box-shadow: var(--color-primary) 0px 0px 2px 1px;

      svg {
        width: 80%;
        height: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: var(--color-primary);
      }
    `}
`;

const Label = styled.span`
  font-size: 1.4rem;
`;

CycleChose.defaultProps = {
  $isChose: false,
  $size: "1.8rem",
};

interface IProps {
  isChose: boolean;
  size?: string; //"2rem"
  label?: string;
}

export default function InputChecked({ isChose, size, label }: IProps) {
  return (
    <InputCheckedStyled>
      <CycleChose $isChose={isChose} $size={size}>
        {isChose && <BsCheckCircleFill />}
      </CycleChose>
      {label && <Label>{label}</Label>}
    </InputCheckedStyled>
  );
}
