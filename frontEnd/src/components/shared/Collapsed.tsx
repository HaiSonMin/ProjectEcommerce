import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import styled, { css } from 'styled-components';
import Collapse from 'react-css-collapse';

const CollapseStyled = styled.div`
  margin-top: 1rem;
`;

const CollapseTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  background-color: var(--color-grey-200);
  font-size: 1.6rem;
  font-weight: 500;
  width: 100%;
  padding: 8px 1rem;
  transition: all 0.2s;
  border-bottom: 1px solid var(--color-grey-300);
  cursor: pointer;
  &:hover {
    background-color: var(--color-red-800);
    color: var(--color-white);
  }
`;

const CollapseBox = styled(Collapse)<{ $isActive: boolean }>`
  background-color: var(--color-grey-200);
  padding: 0 1rem;
  border-radius: 6px;
  ${({ $isActive }) =>
    $isActive &&
    css`
      padding: 0 1rem 1rem;
    `}
  transition: height 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

interface IProps {
  title: string;
  children: React.ReactNode;
}

const Collapsed = ({ title, children }: IProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  return (
    <CollapseStyled>
      <CollapseTitle onClick={toggleCollapsible}>
        <p>{title}</p>
        {!isActive ? <IoIosArrowBack /> : <IoIosArrowDown />}
      </CollapseTitle>
      <CollapseBox isOpen={isActive} $isActive={isActive}>
        {children}
      </CollapseBox>
    </CollapseStyled>
  );
};

export default Collapsed;
