import { Outlet } from 'react-router';
import styled from 'styled-components';
import HeaderLayout from '@/components/Public/header';
import FooterLayout from '@/components/Public/footer';
import PopupChat from '@/components/popup-chat';

const PublicLayoutStyled = styled.div`
  height: 80vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
  padding-bottom: 1.5rem;
`;

const Container = styled.div`
  position: relative;
  margin: 14rem auto 0;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function PublicLayout() {
  return (
    <PublicLayoutStyled>
      <HeaderLayout />
      <Main>
        <Container>
          <Outlet />
          <PopupChat />
        </Container>
      </Main>
      <FooterLayout />
    </PublicLayoutStyled>
  );
}
