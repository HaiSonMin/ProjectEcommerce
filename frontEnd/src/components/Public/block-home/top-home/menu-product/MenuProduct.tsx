import { Link } from "react-router-dom";
import { css, styled } from "styled-components";
import { SlScreenDesktop } from "react-icons/sl";
import { TbFridge, TbAirConditioning } from "react-icons/tb";
import {
  GiWashingMachine,
  GiVacuumCleaner,
  GiPressureCooker,
  GiBlender,
  GiHealing,
} from "react-icons/gi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { TfiPrinter } from "react-icons/tfi";
import { BiChevronRight } from "react-icons/bi";

const MenuContainer = styled.div`
  overflow: auto;
  min-width: 15%;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 15px;
`;
// Menu
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 7px 5px 7px 10px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-secondary);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  & a {
    transition: all 0.3s;
  }

  & a:hover {
    color: var(--color-primary);
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MenuLink = styled(Link)``;

// Menu Detail

const MenuListChild = styled.div<{ $display: boolean }>`
  ${(props) => css`
    display: ${props.$display ? "block" : "none"};
  `}
  position: absolute;
  top: 0;
  left: 200px;
  background-color: #fff;
  border-radius: 0 1rem 1rem 1rem;
  flex-wrap: wrap;
  min-height: 37.5rem;
  padding: 0 1.5rem;
  width: calc(100% - 20rem);
  z-index: 10;
`;

const MenuChildItem = styled.div``;

export default function MenuProduct() {
  return (
    <MenuContainer>
      <MenuList>
        <MenuItem>
          <MenuItemContent>
            <SlScreenDesktop />
            <div>
              <MenuLink to={"#"}>Tivi</MenuLink>,{" "}
              <MenuLink to={"#"}>Loa</MenuLink>,{" "}
              <MenuLink to={"#"}>Dàn karaoke</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <TbFridge />
            <div>
              <MenuLink to={"#"}>Tủ lạnh</MenuLink>,{" "}
              <MenuLink to={"#"}>Tủ đông</MenuLink>,{" "}
              <MenuLink to={"#"}>Tủ mát</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <GiWashingMachine />
            <div>
              <MenuLink to={"#"}>Máy giặt</MenuLink>,{" "}
              <MenuLink to={"#"}>Sấy</MenuLink>,{" "}
              <MenuLink to={"#"}>Nước nóng</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <TbAirConditioning />
            <div>
              <MenuLink to={"#"}>Máy lạnh</MenuLink>,{" "}
              <MenuLink to={"#"}>Quạt</MenuLink>,{" "}
              <MenuLink to={"#"}>Lọc khí</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <GiVacuumCleaner />
            <div>
              <MenuLink to={"#"}>Máy hút bụi</MenuLink>,{" "}
              <MenuLink to={"#"}>Bàn ủi</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <GiPressureCooker />
            <div>
              <MenuLink to={"#"}>Đồ dùng bếp</MenuLink>,{" "}
              <MenuLink to={"#"}>Nồi cơm</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <GiBlender />
            <div>
              <MenuLink to={"#"}>Máy xoay</MenuLink>,{" "}
              <MenuLink to={"#"}>Ép</MenuLink>,{" "}
              <MenuLink to={"#"}>Lọc nước</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <GiHealing />
            <div>
              <MenuLink to={"#"}>Sức khỏe</MenuLink>,{" "}
              <MenuLink to={"#"}>Làm Đẹp</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <HiOutlineDevicePhoneMobile />
            <div>
              <MenuLink to={"#"}>Điện thoại</MenuLink>,{" "}
              <MenuLink to={"#"}>Laptop</MenuLink>,{" "}
              <MenuLink to={"#"}>Tablet</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
        <MenuItem>
          <MenuItemContent>
            <TfiPrinter />
            <div>
              <MenuLink to={"#"}>PC</MenuLink>,{" "}
              <MenuLink to={"#"}>Accessory office</MenuLink>
            </div>
          </MenuItemContent>
          <BiChevronRight />
        </MenuItem>
      </MenuList>
    </MenuContainer>
  );
}
