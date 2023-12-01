import { styled } from 'styled-components';
import { useNavigate } from 'react-router';
import { HiOutlineUser } from 'react-icons/hi2';
import ButtonIcon from '../shared/ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import { PATH_ADMIN } from '@/constant/path-router';

const HeaderAdminMenuStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 1;
`;

const Logout = styled.div``;

const HeaderAdminMenu = () => {
  const navigate = useNavigate();
  return (
    <HeaderAdminMenuStyled>
      <li>
        <ButtonIcon onClick={() => navigate(PATH_ADMIN.account)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      {/* <li>
        <DarkModeToggle />
      </li> */}
      <li>
        <Logout>
          Thoát
        </Logout>
      </li>
    </HeaderAdminMenuStyled>
  );
};

export default HeaderAdminMenu;
