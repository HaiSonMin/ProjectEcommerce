import styled from "styled-components";
import { Menu } from "antd";
import { GiRank2 } from "react-icons/gi";
import { ImHome } from "react-icons/im";
import { AiFillCarryOut, AiOutlineLogout } from "react-icons/ai";
import { BsFillGiftFill } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { BiSupport } from "react-icons/bi";
import { FcIdea } from "react-icons/fc";
import { PATH_MEMBER } from "@/constant/path-router";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";

const SideMenuContainer = styled.div`
  background-color: var(--color-grey-200);
  border-radius: 1rem;
  overflow: hidden;
  align-self: flex-start;
  padding: 0 5px;
`;
const MenuCSS = styled(Menu)`
  background-color: transparent;
  font-size: 1.6rem;
  border-inline-end: none !important;

  .ant-menu-item {
    display: flex;
    align-items: center;
    &:hover {
      color: var(--color-primary) !important;
      outline: 1px solid var(--color-primary) !important;
      background-color: var(--color-red-100) !important;
    }

    &:active&:focus {
      color: var(--color-primary) !important;
      outline: 1px solid var(--color-primary) !important;
      background-color: var(--color-red-100) !important;
    }
  }

  svg {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    opacity: 0.7;
  }
`;
export default function DashboardMemberLayout() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(`/${pathName.split("/")[2]}`);
    console.log(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <SideMenuContainer>
      <MenuCSS
        mode="vertical"
        onClick={(item) => {
          setSelectedKeys(() => item.key);
          if (item.key.slice(1) !== `${PATH_MEMBER.logout}`)
            navigate(item.key.slice(1));
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Trang chủ",
            key: `/${PATH_MEMBER.home}`,
            icon: <ImHome />,
          },
          {
            label: "Lịch sử mua hàng",
            key: `/${PATH_MEMBER.historyorder}`,
            icon: <RiHistoryLine />,
          },
          {
            label: "Tra cứu bảo hành",
            key: `/${PATH_MEMBER.warranty}`,
            icon: <AiFillCarryOut />,
          },
          {
            label: "Ưu đãi của bạn",
            key: `/${PATH_MEMBER.order}`,
            icon: <BsFillGiftFill />,
          },
          {
            label: "Hạng thành viên",
            key: `/${PATH_MEMBER.rank}`,
            icon: <GiRank2 />,
          },
          {
            label: "Tài khoản của bạn",
            key: `/${PATH_MEMBER.account}`,
            icon: <RxAvatar />,
          },
          {
            label: "Hỗ trợ",
            key: `/${PATH_MEMBER.support}`,
            icon: <BiSupport />,
          },
          {
            label: "Góp ý - Phản hồi",
            key: `/${PATH_MEMBER.feedback}`,
            icon: <FcIdea />,
          },
          {
            label: "Thoát tài khoản",
            key: `/${PATH_MEMBER.logout}`,
            icon: <AiOutlineLogout />,
          },
        ]}
      />
    </SideMenuContainer>
  );
}
