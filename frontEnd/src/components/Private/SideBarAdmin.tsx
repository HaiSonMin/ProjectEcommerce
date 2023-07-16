import { styled } from "styled-components";
import MainNavAdmin from "./MainNavAdmin";
import { Logo } from "../../components";
const SideBarAdminStyled = styled.div`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-300);
  padding: 2rem 3rem 4rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
`;

const SideBarAdmin = () => {
  return (
    <SideBarAdminStyled>
      <Logo />
      <MainNavAdmin />
    </SideBarAdminStyled>
  );
};

export default SideBarAdmin;
