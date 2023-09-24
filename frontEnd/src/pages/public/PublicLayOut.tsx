import { Outlet } from "react-router";
import styled from "styled-components";
import HeaderLayout from "@/components/Public/header";
import FooterLayout from "@/components/Public/footer";

const PublicLayoutStyled = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
`;

const Container = styled.div`
  margin: 14rem auto 0;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export const AppWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

export const LoginForm = styled.div<{ showLoginForm: boolean }>`
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  filter: ${(props) => (props.showLoginForm ? "blur(5px)" : "none")};
`;
export default function PublicLayout() {
  return (
    <PublicLayoutStyled>
      <HeaderLayout />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <FooterLayout />
    </PublicLayoutStyled>
  );
}
