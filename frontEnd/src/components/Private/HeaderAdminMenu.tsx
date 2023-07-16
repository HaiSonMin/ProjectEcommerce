import { CONSTANT } from "../../utils";
import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { HiOutlineUser } from "react-icons/hi2";
import ButtonIcon from "../ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import { Logout } from "../";

const HeaderAdminMenuStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 1;
`;

const HeaderAdminMenu = () => {
  const navigate = useNavigate();
  return (
    <HeaderAdminMenuStyled>
      <li>
        <ButtonIcon onClick={() => navigate(CONSTANT.PATH_ADMIN.account)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </HeaderAdminMenuStyled>
  );
};

export default HeaderAdminMenu;
