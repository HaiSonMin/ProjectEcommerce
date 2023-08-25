import { css, styled } from "styled-components";

const StyledItem = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  gap: 6px;
  font-size: 1.4rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  padding: 5px 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  background-color: var(--color-grey-200);
  cursor: pointer;

  ${(props) =>
    props.$isActive &&
    css`
      color: var(--color-primary);
      border-color: var(--color-primary);
      background-color: var(--color-red-100);
    `}
`;

interface IProps {
  children: any;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isActive: boolean;
}

export default function StyledItemFilter({
  children,
  onClick,
  isActive,
}: IProps) {
  return (
    <StyledItem $isActive={isActive} onClick={onClick}>
      {children}
    </StyledItem>
  );
}
