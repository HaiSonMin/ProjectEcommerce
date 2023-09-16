import { Button } from "@/components";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH_USER } from "@/constant";
import { TbMessageCircle2 } from "react-icons/tb";

const ForgetPasswordContainer = styled.div`
  font-family: "Times New Roman", Times, serif;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  
`;
const Topcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
`;
const IconBack = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  cursor: pointer;
  width: 700px;
  h4{
    font-weight: 600;
  }
`;

const Maincontainer = styled.div`
  text-align: left;
  p{
    margin-bottom: 1.5rem;
    color: #7c7b7b;
  }
`;
const ImgLogo = styled.img`
  width: 150px;
`;
const ComfirmGetPassword = styled.div`
  width: 700px;
  border: 2px solid red;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
`;
const TbMessageCircle2Style = styled(TbMessageCircle2)`
font-size: 5rem;
background-color: #ec98b1;
color: red;
padding: 1rem .8rem;
border-radius: 50%;
`
const Phonenumber = styled.div`
  p {
    color: #7c7b7b;
  }
  h4 {
    font-weight: 700;
  }
`;

const PhoneNumber = ({ number }) => {
    // Kiểm tra xem số điện thoại có đủ độ dài không
    if (number.length !== 10) {
      return <div>Số điện thoại không hợp lệ</div>;
    }
    const firstThreeDigits = number.slice(0, 3);
    const lastTwoDigits = number.slice(8, 10);
    const maskedNumber = `${firstThreeDigits}*****${lastTwoDigits}`;
  
    return <div>{maskedNumber}</div>;
  };

export default function ForgetPassword() {
    const phoneNumber = '1234567890'; 
  return (
    <ForgetPasswordContainer>
      <IconBack>
        <Link to={`/${PATH_USER.login}`}>
          <FaArrowLeft />
        </Link>
        <h4>Quên mật khẩu </h4>
        <FaArrowLeft style={{color:'white'}} />
      </IconBack>
      <Topcontainer>
        
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logo"
        ></ImgLogo>
      </Topcontainer>
      <Maincontainer>
        <p>Gửi mã xác nhận để lấy lại mật khẩu</p>
        <ComfirmGetPassword>
          <TbMessageCircle2Style />
          <Phonenumber>
            <p>Qua tin nhắn SMS</p>
            <h4><PhoneNumber number={phoneNumber}/></h4>
          </Phonenumber>
        </ComfirmGetPassword>
      </Maincontainer>
      <Button style={{ width: '700px'}}>Tiếp Tục</Button>
    </ForgetPasswordContainer>
  );
}
