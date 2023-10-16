import useOutSideClick from "../../hooks/useOutSide";
import React, {
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { styled } from "styled-components";

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.3s;
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.3s;
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  background: none;
  border: none;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    fill: var(--color-grey-500);
    stroke: var(--color-grey-500);
    color: var(--color-grey-500);
  }
`;

type TypeContext = {
  open: any;
  close: () => void;
  openName: string;
};

const initialize: TypeContext = {
  open: "",
  close: () => {},
  openName: "",
};

interface IProps {
  children: ReactNode;
  openWindowName: string;
  windowName: string;
}

const ModalContext = createContext(initialize as TypeContext);
const Modal = (props: Pick<IProps, "children">): any => {
  const [openName, setOpenName] = useState<string>("");

  const open: any = setOpenName;
  const close: any = () => setOpenName("");

  const value: TypeContext = {
    open,
    close,
    openName,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}
    </ModalContext.Provider>
  );
};

const Open = (props: Omit<IProps, "windowName">): React.ReactElement => {
  const { open } = useContext(ModalContext);
  return cloneElement(props.children as React.ReactElement, {
    onClick: () => open(props.openWindowName),
  });
};

const Window = (props: Omit<IProps, "openWindowName">) => {
  const { close, openName } = useContext(ModalContext);

  const ref = useOutSideClick(close, true);

  if (openName !== props.windowName) return null;

  return createPortal(
    <Overlay>
      <ModalStyle ref={ref}>
        <CloseButton onClick={close}>
          <IoClose />
        </CloseButton>
        <>
          {cloneElement(props.children as React.ReactElement<any>, {
            onCloseModal: close,
          })}
        </>
      </ModalStyle>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
