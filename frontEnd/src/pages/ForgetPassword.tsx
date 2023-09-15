import { Button } from '@/components'
import React from 'react'
import { BiArrowFromRight, BiArrowToRight } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { PATH_USER } from '@/constant';

const ForgetPasswordContainer = styled.div`
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.6rem;
    display:flex;
    flex-direction: column;
    text-align: center;
`;
const Topcontainer = styled.div`
    
`;
const IconBack = styled.span`
    position: relative;
    left:2rem;
    top:2.5rem;
    font-size: 2rem;
`;
const TitlePhone = styled.div`
`;
const Maincontainer = styled.div`
`;
const ImgLogo = styled.img`
    width:150px;
`;
export default function ForgetPassword() {
  return (
    <ForgetPasswordContainer>
            <Topcontainer>
                <IconBack>
                    <Link to={`/${PATH_USER.login}`}>
                        <FaArrowLeft/>
                    </Link>
                </IconBack>
                <h4>Quên mật khẩu </h4>
                <ImgLogo src='https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png' alt='logo'></ImgLogo>
            </Topcontainer>
            <Maincontainer>
                <p>Gửi mã xác nhận để lấy lại mật khẩu</p>
                <TitlePhone>

                </TitlePhone>
            </Maincontainer>
            <Button>Tiếp Tục</Button>
    </ForgetPasswordContainer>
  )
}
