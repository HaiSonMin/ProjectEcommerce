import Heading from "@/components/shared/Heading";
import { useEffect, useRef, useState } from "react";
import { FaUserAlt, FaUserAltSlash, FaUserCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";
import { FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import UseAuthApi from "@/apis-use/UseAuthApi";
import { SpinnerLogo, Overlay } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "@/storeReducer/public/userSlice";
import { EnumRoleUser } from "@/enum";
import { PATH_AUTH, PATH_ADMIN, PATH_PUBLIC } from "@/constant/path-router";

const HeaderButtonAuthStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: var(--color-white);
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

const AuthModal = styled.div<{ $showLoginForm: boolean }>`
  position: fixed;
  font-family: "McLaren", cursive;
  background-color: white;
  border: 1px solid #ccc;
  padding: 2rem;
  max-width: 36rem;
  left: 50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 100;
  ${(props) =>
    props.$showLoginForm &&
    css`
      animation: ${animationModal} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
    `}
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  svg:first-child {
    width: 3.4rem;
    height: 3.4rem;
    color: var(--color-primary);
  }

  svg:last-child {
    position: absolute;
    cursor: pointer;
    width: 2.8rem;
    height: 2.8rem;
    top: 1rem;
    right: 1rem;
    color: var(--color-grey-400);
    border-radius: 999px;
    transition: all 0.3s;

    :hover {
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
  color: var(--color-white);
`;

const ButtonRegister = styled(Link)`
  ${ButtonStyle}
  background-color:var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
`;

// Have login

const BoxOption = styled.div<{ $showLogout: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-white);
  color: var(--color-text);
  display: ${(props) => (props.$showLogout ? "flex" : "none")};
  flex-direction: column;
  border-radius: 1rem;
  font-size: 1.6rem;

  .btn__link,
  .btn__logout {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 3.5rem 1.5rem 2rem;
    &:hover {
      color: var(--color-primary);
    }
  }

  .btn__link {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

export default function HeaderButtonAuth() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);
  const [showOptionUser, setShowOptionUser] = useState<boolean>(false);
  const { isLogout, logout } = UseAuthApi.logout();
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const toggleOptionUser = () => setShowOptionUser(!showOptionUser);

  const refOptionUser = useRef<HTMLDivElement>(null);
  const handlerClickDocument = (event: MouseEvent) => {
    if (
      refOptionUser.current &&
      !refOptionUser.current.contains(event.target as Node)
    )
      setShowOptionUser(false);
  };

  useEffect(() => {
    document.addEventListener("click", handlerClickDocument);
    return () => document.removeEventListener("click", handlerClickDocument);
  }, []);

  const handlerLogout = () => {
    logout();
    dispatch(deleteUser());
  };

  return (
    <>
      {!user.userId ? (
        <HeaderButtonAuthStyled onClick={toggleLoginForm}>
          <FaUserAltSlash />
          <p>Đăng nhập</p>
          <Overlay $isShow={showLoginForm} onClick={closeLoginForm}>
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
                <ButtonLogin
                  onClick={closeLoginForm}
                  to={`/${PATH_AUTH.auth}/${PATH_AUTH.login}`}
                >
                  Đăng nhập ngay
                </ButtonLogin>
                <ButtonRegister
                  onClick={closeLoginForm}
                  to={`/${PATH_AUTH.auth}/${PATH_AUTH.register}`}
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
            toggleOptionUser();
          }}
        >
          <FaUserAlt />
          <p>{user.userFullName}</p>
          <BoxOption $showLogout={showOptionUser} ref={refOptionUser}>
            {user.userRole === EnumRoleUser.USER ? (
              <Link to={`${PATH_PUBLIC.member}`} className="btn__link">
                <FaUserCircle />
                <span>Smember</span>
              </Link>
            ) : (
              <Link to={`${PATH_ADMIN.admin}`} className="btn__link">
                <FaUserCircle />
                <span>Admin</span>
              </Link>
            )}
            <div className="btn__logout" onClick={handlerLogout}>
              <FiLogOut />
              <span>Logout</span>
            </div>
          </BoxOption>
        </HeaderButtonAuthStyled>
      )}
      {isLogout && <SpinnerLogo />}
    </>
  );
}
