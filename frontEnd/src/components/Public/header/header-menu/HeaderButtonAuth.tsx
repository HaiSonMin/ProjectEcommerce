import Heading from "@/components/Heading";
import { PATH_USER } from "@/constant";
import { useEffect, useRef, useState } from "react";
import { FaUserAlt, FaUserAltSlash, FaUserCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";
import { FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const HeaderButtonAuthStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: #fff;
  font-size: 1.2rem;
  padding: 5px 1.5rem;
  border-radius: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  background-color: var(--color-primary-light);

  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

const animationModal = keyframes`
  0%   {top:110%; }
  100% {top:50%;}
`;

const Overlay = styled.div<{ $showLoginForm: boolean }>`
  display: ${(props) => (props.$showLoginForm ? "block" : "none")};
  width: 100vw;
  height: 100vh;
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

const AuthModal = styled.div<{ $showLoginForm: boolean }>`
  position: fixed;
  font-family: "McLaren", cursive;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  max-width: 36rem;

  ${(props) =>
    props.$showLoginForm &&
    css`
      transition: all 0.3s ease-in-out;
      animation: ${animationModal} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
    `}
  left:50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  & svg:first-child {
    width: 3.4rem;
    height: 3.4rem;
    color: var(--color-primary);
  }

  & svg:last-child {
    position: absolute;
    cursor: pointer;
    width: 2.8rem;
    height: 2.8rem;
    top: 1rem;
    right: 1rem;
    color: var(--color-grey-400);
    border-radius: 999px;
    transition: all 0.3s;

    &:hover {
      color: var(--color-grey-500);
    }
  }
`;

const ContainerBtn = styled.div`
  display: flex;
  gap: 2rem;
`;

const ButtonStyle = css`
  display: inline-block;
  text-align: center;
  width: 18rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const ButtonLogin = styled(Link)`
  ${ButtonStyle}
  background-color: var(--color-primary);
  color: #fff;
`;

const ButtonRegister = styled(Link)`
  ${ButtonStyle}
  background-color:#fff;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
`;

// Have login

const BoxLogout = styled.div<{ $showLogout: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  color: var(--color-text);
  display: ${(props) => (props.$showLogout ? "flex" : "none")};
  flex-direction: column;
  border-radius: 1rem;
  font-size: 1.6rem;

  & a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 3.5rem 1.5rem 2rem;

    &:hover {
      color: var(--color-primary);
    }
  }

  & a:first-child {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

interface IProps {
  dataStorage: any;
}
export default function HeaderButtonAuth({ dataStorage }: IProps) {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const toggleLogout = () => setShowLogout(!showLogout);

  let fullName: string = "User";
  if (dataStorage) fullName = dataStorage.userName.split(" ");

  const refLogout = useRef<HTMLDivElement>(null);
  const handlerClickDocument = (event: MouseEvent) => {
    if (refLogout.current && !refLogout.current.contains(event.target as Node))
      setShowLogout(false);
  };

  useEffect(() => {
    document.addEventListener("click", handlerClickDocument);
    return () => document.removeEventListener("click", handlerClickDocument);
  }, []);

  console.log(dataStorage);
  return (
    <>
      {!dataStorage ? (
        <HeaderButtonAuthStyled onClick={toggleLoginForm}>
          <FaUserAltSlash />
          <p>Đăng nhập</p>
          <Overlay $showLoginForm={showLoginForm} onClick={closeLoginForm}>
            <AuthModal
              $showLoginForm={showLoginForm}
              onClick={(e) => e.stopPropagation()}
            >
              <HeaderModal>
                <FaUserTie />
                <Heading $as="h3" style={{ color: "var(--color-primary)" }}>
                  Smember
                </Heading>
                <IoCloseCircleSharp onClick={closeLoginForm} />
              </HeaderModal>
              <Heading $as="h6">
                Vui lòng đăng nhập tài khoản Smember để có trải nghiệm mua sắm
                tốt hơn
              </Heading>
              <ContainerBtn>
                <ButtonLogin onClick={closeLoginForm} to={PATH_USER.login}>
                  Đăng nhập ngay
                </ButtonLogin>
                <ButtonRegister
                  onClick={closeLoginForm}
                  to={PATH_USER.register}
                >
                  Đăng kí ngay
                </ButtonRegister>
              </ContainerBtn>
            </AuthModal>
          </Overlay>
        </HeaderButtonAuthStyled>
      ) : (
        <HeaderButtonAuthStyled
          onClick={(e) => {
            e.stopPropagation();
            toggleLogout();
          }}
        >
          <FaUserAlt />
          <p>{fullName[fullName.length - 1]}</p>
          <BoxLogout $showLogout={showLogout} ref={refLogout}>
            <Link to={"#"}>
              <FaUserCircle />
              <span>Smember</span>
            </Link>
            <Link to={"#"}>
              <FiLogOut />
              <span>Logout</span>
            </Link>
          </BoxLogout>
        </HeaderButtonAuthStyled>
      )}
    </>
  );
}
