import { BiSearchAlt2 } from "react-icons/bi";
import { styled } from "styled-components";

const ContainerInput = styled.div`
  position: relative;
  height: 3.5rem;
  max-width: 30rem;
  @media (min-width: 1024px) {
    min-width: 30rem;
  }
  & svg {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 2.4rem;
    height: 2.4rem;
    opacity: 0.3;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
`;

const SearchInput = styled.input`
  border-radius: 1rem;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

export default function HeaderSearch() {
  return (
    <ContainerInput>
      <SearchInput type="text" placeholder="Search product" />
      <BiSearchAlt2 />
    </ContainerInput>
  );
}
