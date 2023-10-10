import styled from "styled-components";
import { Outlet } from "react-router";
import HeaderLayout from "@/components/Public/header";
import DashboardMember from "./dash-board/Dashboard";
const PublicLayoutStyled = styled.div`
  height: 100vh;
  
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
    position: absolute;
    top: 160px;
    left: 370px;
    width: 70%;
    height: 100vh;
`;


export default function MemberLayout() {
    return (
      <PublicLayoutStyled>
        <HeaderLayout/>
        <DashboardMember/>
        <Main>
          <Container>
          <Outlet/>
          </Container>
        </Main>
      </PublicLayoutStyled>
    );
  }