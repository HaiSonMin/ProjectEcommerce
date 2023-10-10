
import styled from "styled-components";
import { useState } from 'react';
import CardHistory from "./CardHistory";

const HistoryContainer = styled.div``;
const Logo = styled.img`
  width: 70px;
  height: 70px;
`;
const LogoContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  margin-top: 1rem;
`;
const Infor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Title = styled.div`
  margin: 0;
  span {
    border: 1px red solid;
    padding: 1px 1rem;
    border-radius: 0.3rem;
    color: red;
  }
`;
const SubTitle = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  text-align: center;
  gap: 1rem;

  background-color: #fff;
  padding: 0.5rem 0;
  border-radius: 8px;
  margin-top: 1rem;
`;

const TextCenter = styled.div`
  height: 80%;
  border-right: 1.5px solid #000;
  margin-top: 10px;
`;
const TextCenterA = styled.div`
  margin-top: 10px;
`;
const Hr = styled.div``;
const DateOrder = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 1rem;
  justify-content: center;
`;
const ButtonOrder = styled.button`
  border-radius: 5px;
  padding: 0.8rem 1rem;
  border: 1px solid silver;
  outline: none;
`;
const DataOrder = styled.button`
  margin-top: 3rem;
  display: grid;
  gap: 1rem;
  justify-content: center;
  width: 100%;
img{
  width: 240px;
}

`;

export default function WarrantyLookup() {
  

  return (
    <HistoryContainer>
      <Infor>
        <LogoContainer>
          <Logo
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="avatar"
          />
        </LogoContainer>
        <Title>
          <h3>Name ..........</h3>
          <span> None </span>
        </Title>
      </Infor>
      <SubTitle>
        <TextCenter>
          <h3>0</h3>
          <p>đơn hàng</p>
        </TextCenter>

        <TextCenterA>
          <h3>0đ</h3>
          <p>Tổng tiền tích luỹ</p>
        </TextCenterA>
      </SubTitle>
      <CardHistory/>
    </HistoryContainer>
  );
}
