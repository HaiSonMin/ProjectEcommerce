import { Outlet } from "react-router";
import { styled } from "styled-components";
import { HeaderAdmin, SideBarAdmin } from "../../components/Private";

const AdminLayoutSide = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.2rem 4.1rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function AdminLayout() {
  return (
    <AdminLayoutSide>
      <HeaderAdmin />
      <SideBarAdmin />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </AdminLayoutSide>
  );
}