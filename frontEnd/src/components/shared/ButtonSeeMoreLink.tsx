import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonSeeMoreLinkStyled = styled(Link)`
  min-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 8px 0;
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  cursor: pointer;

  & svg {
    transition: all 0.3s;
  }

  &:hover {
    color: var(--color-primary);
    outline: 1px solid var(--color-primary);
    background-color: var(--color-red-100);

    & svg {
      scale: 1.15;
    }
  }
`;

interface IProps {
  children: any;
  to: string;
}

export default function ButtonSeeMoreLink({ children, to }: IProps) {
  return (
    <ButtonSeeMoreLinkStyled to={to}>
      <span>{children}</span>
      <FaRegEye />
    </ButtonSeeMoreLinkStyled>
  );
}
