import { keyframes, styled } from "styled-components";

const pulse = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.65;
}
100% {
  opacity: 1;
}
`;

const CartStyled = styled.div<{ $width: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  width: ${(props) => props.$width}rem;
  min-height: 30rem;
  padding: 1rem;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  transition: all 0.3s;
  background-color: #fff;
  border-radius: 1rem;
`;

const CartTopLoading = styled.div`
  width: 100%;
  height: 80%;
  background-color: var(--color-grey-200);
  animation: ${pulse} 1s infinite;
`;

const CartBottomLoading = styled.div`
  width: 100%;
  height: 20%;
  background-color: var(--color-grey-200);
  animation: ${pulse} 1s infinite;
`;

interface IProps {
  width: number;
}

export default function CardLoading({ width }: IProps) {
  return (
    <CartStyled $width={width}>
      <CartTopLoading />
      <CartBottomLoading />
    </CartStyled>
  );
}
