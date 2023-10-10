import styled from "styled-components";
import InputMember from "./InputMember";

import { GiRank3 } from "react-icons/gi";

import { AiFillCalendar, AiFillGift, AiOutlineCrown } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcShipped } from "react-icons/fc";
import { FaInfo } from "react-icons/fa";
import Card from "./Card";
const ContainerHomePage = styled.div`
  padding-left: 1rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
const FlexContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
const FlexLeft = styled.div`
  display: grid;
  justify-items: center;
  width: 50%;
  border: 1px #ddd7d7 solid;
  border-radius: 1rem;
  padding: 1rem;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
const LogoContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  margin-top: 1rem;
  width: 50px;
`;
const SpanH = styled.span`
  font-size: 2rem;
  color: red;
`;
const FlexRight = styled.div`
  padding: 1rem;
  background-color: #f3ebdb;
  border-radius: 1rem;
  width: 50%;
  text-align: center;
  div {
    border-radius: 0.5rem;
    background-color: red;
    padding: 0px 0.5rem;
  }
  h1 {
    color: black;
    font-size: 25px;
  }
`;
const ContainerInfor = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  align-items: center;
  gap: 2rem;
`;
const Tips = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #8ab5f5;
  border-radius: 0.5rem;
  padding: 0 1rem;
  margin: 1rem 0;

  div:nth-child(1) {
    p {
      font-size: 14px;
      margin-left: 2rem;
    }
  }
`;
const FaICSS = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  height: 20px;
  margin-top: 1rem;
  div {
    background-color: #0a8ffc;
    padding: 0.5rem 0.6rem;
    border-radius: 50%;
  }
`;
const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export default function HomePage() {
  return (
    <ContainerHomePage>
      <FlexContainer>
        <FlexLeft>
          <LogoContainer>
            <Logo
              src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
              alt="avatar"
            />
          </LogoContainer>
          <span>Xin Chào</span>
          <SpanH>Name Main</SpanH>
          <ContainerInfor>
            <InputMember
              TagDate="Ngày tham gia"
              Icon={<AiFillCalendar />}
              DateCreat="15/2/2023"
              TimeDate=""
            />
            <InputMember
              TagDate="Hạng thành viên"
              Icon={<GiRank3 />}
              DateCreat="None"
              TimeDate=""
            />
            <InputMember
              TagDate="Điểm tích lũy"
              TimeDate="từ 01/01/2022"
              Icon={<RiMoneyDollarCircleFill />}
              DateCreat="0đ"
            />
          </ContainerInfor>
        </FlexLeft>
        <FlexRight>
          <div>
            <h1>CHƯƠNG TRÌNH NỔI BẬT</h1>
          </div>
        </FlexRight>
      </FlexContainer>
      <Tips>
        <div>
          <FaICSS>
            <div>
              <FaInfo />
            </div>
            <h4>Tips</h4>
          </FaICSS>
          <p>
            Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt hàng
            nhanh và thuận tiện hơn.
          </p>
        </div>
        <div>
          <button type="submit">Cập nhật</button>
        </div>
      </Tips>
      <CardContainer>
        <Card
          Color="#FFF2D8"
          Icon={<AiFillGift />}
          Heading="Ưu đãi của bạn"
          Details="Đơn hàng của bạn"
        />
        <Card
          Color="#D6CC99"
          Icon={<FcShipped />}
          Heading="Ưu đãi của bạn"
          Details="Đơn hàng của bạn"
        />
        <Card
          Color="#FF6969"
          Icon={<AiOutlineCrown />}
          Heading="Ưu đãi của bạn"
          Details="Đơn hàng của bạn"
        />
      </CardContainer>
    </ContainerHomePage>
  );
}
