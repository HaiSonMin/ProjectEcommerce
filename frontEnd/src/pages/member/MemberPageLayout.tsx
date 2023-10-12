import styled from "styled-components";
import { Outlet } from "react-router";
import HeaderLayout from "@/components/Public/header";
import { DashboardMemberLayout } from "@/components/member";
const PublicLayoutStyled = styled.div`
  background-color: var(--color-grey-100);
  min-height: 100vh;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 25rem 1fr;
  gap: 2rem;
  margin: 14rem auto 0;
  padding-top: 2rem;
  max-width: 120rem;
`;

const Container = styled.div`
  width: 100%;
  grid-column: 2/-1;
`;

export default function MemberLayout() {
  return (
    <PublicLayoutStyled>
      <HeaderLayout />
      <Main>
        <DashboardMemberLayout />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </PublicLayoutStyled>
  );
}
