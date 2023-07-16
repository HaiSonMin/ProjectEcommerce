import { styled } from "styled-components";
import HeaderAdminMenu from "./HeaderAdminMenu";

const HeaderAdminStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);
  padding: 1.2rem 2.4rem;
`;

const HeaderAdmin = () => {
  return (
    <HeaderAdminStyled>
      <div>Avatar In Here</div>
      <HeaderAdminMenu />
    </HeaderAdminStyled>
  );
};

export default HeaderAdmin;
