
import styled from 'styled-components';
import {Menu} from "antd";
import {GrHistory} from "react-icons/gr";
import {GiRank2} from "react-icons/gi";
import {ImHome} from "react-icons/im";
import {AiFillCarryOut,AiOutlineLogout} from "react-icons/ai";
import {BsFillGiftFill} from "react-icons/bs";
import {RxAvatar} from "react-icons/rx";
import {BiSupport} from "react-icons/bi";
import {FcIdea} from "react-icons/fc";
import { PATH_MEMBER } from "@/constant/path-router";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SideMenuContainer = styled.div`
    width: 200px;
    height: 80vh;
    margin-top:150px;
    margin-left: 150px;
    background-color:#a8d6e2;
`
const MenuCSS = styled(Menu)`
    height: max-content;
    background-color:#a8d6e2;
`
export default function DashboardMember() {
  const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(`/${pathName.split('/')[2]}`);
      console.log(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return <SideMenuContainer>
        <MenuCSS
        mode="vertical"
        onClick={(item) => {
          setSelectedKeys(()=>item.key);
          navigate(item.key.slice(1))
        }}
        selectedKeys={[selectedKeys]}
        items={[
            {
              label: "Trang chủ",
              icon: <ImHome/>,
              key: `/${PATH_MEMBER.home}`,
            },
            {
              label: "Lịch sử mua hàng",
              icon: <GrHistory />,
              key:`/${PATH_MEMBER.historyorder}`,
              
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
                key:  `/${PATH_MEMBER.support}`,
                icon: <BiSupport />,
              },
              {
                label: "Góp ý - Phản hồi",
                key:  `/${PATH_MEMBER.feedback}`,
                icon: <FcIdea />,
              },
              {
                label: "Thoát tài khoản",
                key:  `/${PATH_MEMBER.logout}`,
                icon: <AiOutlineLogout />,
              },
              
          ]}
        />
        
    </SideMenuContainer>
}