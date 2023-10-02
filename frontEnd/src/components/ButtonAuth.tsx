import styled, { css, keyframes } from "styled-components";
import { MdNoAccounts, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { PATH_AUTH, PATH_PUBLIC } from "@/constant/path-router";

const animationModal = keyframes`
  0% { top: 100%; }
  100% { top: 50%; }
`;

const LoginModal = styled.div<{ $showLoginForm: boolean }>`
  font-family: "McLaren", cursive;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  position: fixed;
  ${(props) =>
    props.$showLoginForm &&
    css`
      transition: all 0.3s ease-in-out;
      animation: ${animationModal} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
    `}

  left: 50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const SmemberIcon = styled(MdNoAccounts)`
  font-size: 25px;
`;

const CloseIcon = styled(MdClose)`
  font-size: 25px;
  position: absolute;
  cursor: pointer;
  right: 5%;
  border-radius: 50%;
  background: silver;
  color: white;
`;

const LoginButtonStyled = styled.div`
  .nav-styled {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    font-size: 1.4rem;
    padding: 5px 1rem;
    border-radius: 1rem;
    transition: all 0.3s;
    cursor: pointer;

    & svg {
      width: 2.8rem;
      height: 2.8rem;
    }

    &:hover {
      background-color: var(--color-primary-light);
    }
  }
`;
const Overlay = styled.div<{ $showLoginForm: boolean }>`
  display: ${(props) => (props.$showLoginForm ? "block" : "none")};
  width: 100vw;
  height: 1000vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.3s;
  z-index: 100;
`;
const TitleSmember = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;
const H2Style = styled.h2`
  /* style={{ textAlign: "left", fontSize: "20px" }} */
  text-align: left;
  font-size: 2rem;
`;
const ButtonAuthClick = styled.div`
  /* style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }} */
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const StyledLink = styled(Link)`
  text-align: center;
  color: white;
  background-color: red;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  border: 1px solid red;
`;

interface LoginButtonProps {
  showLoginForm: boolean;
  toggleLoginForm: () => void;
  closeLoginForm: () => void;
}

const ButtonAuth: React.FC<LoginButtonProps> = ({
  showLoginForm,
  toggleLoginForm,
  closeLoginForm,
}) => {
  return (
    <LoginButtonStyled>
      <div className="nav-styled" onClick={toggleLoginForm}>
        <SmemberIcon />
        <p>
          Đăng
          <br />
          nhập
        </p>
      </div>
      <Overlay $showLoginForm={showLoginForm} onClick={closeLoginForm}>
        <LoginModal $showLoginForm={showLoginForm}>
          <TitleSmember>
            <SmemberIcon />
            <p>Smember</p>
            <CloseIcon onClick={closeLoginForm} />
          </TitleSmember>
          <H2Style>
            Vui lòng đăng nhập tài khoản Smember để <br /> có trải nghiệm mua
            sắm tốt hơn
          </H2Style>
          <ButtonAuthClick>
            <StyledLink onClick={closeLoginForm} to={PATH_AUTH.login}>
              Đăng nhập ngay
            </StyledLink>
            <StyledLink onClick={closeLoginForm} to={PATH_PUBLIC.register}>
              Đăng ký
            </StyledLink>
          </ButtonAuthClick>
        </LoginModal>
      </Overlay>
    </LoginButtonStyled>
  );
};

export default ButtonAuth;
