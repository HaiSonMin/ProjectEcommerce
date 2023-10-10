import React from 'react'
import styled from "styled-components";
import { useState } from 'react';
const CardHistoryContainer = styled.div`
    
`
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
export default function CardHistory() {

    const [RedButton, setRedButton] = useState(null);
  const HandleChangeColor = (element: any) => {
    setRedButton(element);
  }
  const isElementSelected = (element: any) => {
    return element === RedButton;
  };
  const defaultStyle = {
    backgroundColor: "red",
    color: "white",
    border:'none'
  };
  const selectedStyle = {
    backgroundColor: "white",
    color: "black",
  }
  return (
    <CardHistoryContainer>
         <DateOrder>
        <ButtonOrder
         onClick={() => HandleChangeColor("element1")} 
         style={isElementSelected("element1") ? defaultStyle : selectedStyle}
         type='submit'>Tất cả</ButtonOrder>
        <ButtonOrder
        onClick={() => HandleChangeColor("element2")} 
        style={isElementSelected("element2") ? defaultStyle : selectedStyle}
        type='submit'> Đã huỷ</ButtonOrder>
        <ButtonOrder
        onClick={() => HandleChangeColor("element3")} 
        style={isElementSelected("element3") ? defaultStyle : selectedStyle}
        type='submit'>Chờ xác nhận</ButtonOrder>
        <ButtonOrder
        onClick={() => HandleChangeColor("element4")} 
        style={isElementSelected("element4") ? defaultStyle : selectedStyle}
        type='submit'>Đã xác nhận</ButtonOrder>
        <ButtonOrder
        onClick={() => HandleChangeColor("element5")} 
        style={isElementSelected("element5") ? defaultStyle : selectedStyle}
        type='submit'>Đang vận chuyển</ButtonOrder>
        <ButtonOrder
        onClick={() => HandleChangeColor("element6")} 
        style={isElementSelected("element6") ? defaultStyle : selectedStyle}
        type='submit'>Đã giao hàng</ButtonOrder>
      </DateOrder>
      <DataOrder>
        <img src="https://cdn2.cellphones.com.vn/x,webp,q100/media/wysiwyg/Order-empty.png" alt="logo-khong-co-kq-tim-kiem" />
        <p>Không có đơn hàng nào thỏa mản </p>
      </DataOrder>
    </CardHistoryContainer>
  )
}
