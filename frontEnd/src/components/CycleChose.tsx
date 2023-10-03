import { BsCheckCircleFill } from "react-icons/bs";
import styled, { css } from "styled-components";

const CycleChoseStyled = styled.div<{ $isChose: boolean; $size?: string }>`
  position: relative;
  border: 1px solid var(--color-grey-500);
  border-radius: 50%;
  cursor: pointer;
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

CycleChoseStyled.defaultProps = {
  $isChose: false,
  $size: "1.8rem",
};

interface IProps {
  isChose: boolean;
  size?: string; //"2rem"
}

export default function CycleChose({ isChose, size }: IProps) {
  return (
    <CycleChoseStyled $isChose={isChose} $size={size}>
      {isChose && <BsCheckCircleFill />}
    </CycleChoseStyled>
  );
}
