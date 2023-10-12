import { Heading } from "@/components/shared";
import Collapsed from "@/components/shared/Collapsed";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BodyCategoryLeftLayoutStyled = styled.div``;

const NavBar = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 1.5rem;

  .nav--item {
    width: 100%;
    &-link {
      border-radius: 6px;
      background-color: var(--color-grey-200);
      font-size: 1.6rem;
      font-weight: 500;
      display: inline-block;
      width: 100%;
      padding: 8px 1rem;
      transition: all 0.2s;

      &:hover {
        background-color: var(--color-red-800);
        color: var(--color-white);
      }
    }
  }
`;

const LinkCollapse = styled(Link)`
  border-radius: 6px;
  background-color: var(--color-grey-200);
  font-size: 1.4rem;
  font-weight: 500;
  display: inline-block;
  width: 100%;
  padding: 8px 1rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-red-800);
    color: var(--color-white);
  }
`;

export default function BodyCategoryLeftLayout() {
  return (
    <BodyCategoryLeftLayoutStyled>
      <Heading $as="h4">Category Name</Heading>
      <NavBar>
        <li className="nav--item">
          <Link to={"#"} className="nav--item-link">
            Tổng quan tủ lạnh
          </Link>
        </li>
        <li className="nav--item">
          <Link to={"#"} className="nav--item-link">
            Top tủ lạnh bán chạy
          </Link>
        </li>
        <Collapsed title="Concat">
          <LinkCollapse to={"#"}>Link nè</LinkCollapse>
        </Collapsed>
        <Collapsed title="Concat">
          <LinkCollapse to={"#"}>Link nè</LinkCollapse>
        </Collapsed>
        <Collapsed title="Concat">
          <LinkCollapse to={"#"}>Link nè</LinkCollapse>
        </Collapsed>
      </NavBar>
    </BodyCategoryLeftLayoutStyled>
  );
}
