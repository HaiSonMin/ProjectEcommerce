import useOutSideClick from "../hooks/useOutSide";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import styled from "styled-components";

type TypePos = { x: number; y: number };

const Menu = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggleButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-0);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ $position: TypePos }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenuContextType = {
  open: React.Dispatch<React.SetStateAction<string>>;
  close: () => void;
  openId: string;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

interface IProps {
  children: React.ReactNode;
  id: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

const MenuContext = createContext({} as MenuContextType);

const Menus = (props: Pick<IProps, "children">) => {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<any>(null);

  const open = setOpenId;
  const close = () => setOpenId("");

  const value: MenuContextType = {
    open,
    close,
    openId,
    position,
    setPosition,
  };
  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
};

const ToggleButton = (props: Pick<IProps, "id">) => {
  const { open, openId, close, setPosition } = useContext(MenuContext);

  function handlerClick(e: any) {

    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.x - 2 * rect.width,
      y: rect.y + rect.height + 5,
    });
    return openId === "" || openId !== props.id ? open(props.id) : close();
  }

  return (
    <StyledToggleButton onClick={handlerClick}>
      <HiEllipsisVertical />
    </StyledToggleButton>
  );
};

function List(props: Pick<IProps, "id" | "children">) {
  const { close, openId, position } = useContext(MenuContext);
  const ref = useOutSideClick(close, false);

  if (openId !== props.id) return null;
  return createPortal(
    <StyledList ref={ref} $position={position}>
      {props.children}
    </StyledList>,
    document.body
  );
}

function Button(props: Omit<IProps, "id">) {
  const { close } = useContext(MenuContext);
  function handlerClick() {
    props.onClick?.();
    close();
  }

  return (
    <StyledButton onClick={handlerClick}>
      {props.icon} {props.children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;
Menus.ToggleButton = ToggleButton;
export default Menus;
