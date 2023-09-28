import React from "react";
import styled from "styled-components";
import { GiWallet, GiShoppingCart } from "react-icons/gi";
const TestCenter = styled.div`
  text-align: center;
  padding: 1rem;
`;
const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;
const TitleRed = styled.div`
  background-color: red;
  padding: 1rem;
  color: white;
  border-radius: 1rem;
  width: max-content;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
const TitleP = styled.div`
  padding: 1rem 3rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: left;
  .icon {
    width: 40px;
  }
  p {
  }
`;
const DKXH = styled.div``;
const UDMH = styled.div``;
const CSPV = styled.div`
`;
const SVip = styled.div``;


export default function IncentivesDetails(props) {
  return (
    <>
      <FlexCenter>
        <DKXH>
          <TitleRed>
            <GiWallet fontSize="30" />
            <h3>Điều kiện xếp hạng</h3>
          </TitleRed>

          <TitleP>
            <GiWallet fontSize="50" />
            <p>
              {/* Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt
              từ {props.firstNumber} đến {props.secondNumber} triệu đồng */}
              {props.titleDKXH}
            </p>
          </TitleP>
        </DKXH>
        <UDMH>
          <TitleRed>
            <GiWallet fontSize="30" />
            <h3>Ưu đãi mua hàng</h3>
          </TitleRed>

          
          <TitleP>
           <span style={{fontSize:"50px"}}>
            {props.iconUDMHa}
            </span> 
            <p>
            <b>Giảm thêm {props.numberA}</b>
              {/* Giảm thêm 2% khi mua các sản phẩm thuộc nhóm hàng loa -<br /> tai
              nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng,<br/> balo -
              túi xách */}
              {props.titleUDMHa}
            </p>
          </TitleP>

          <TitleP>
          <span style={{fontSize:"50px"}}>
            {props.iconUDMHb}
            </span> 
            <p>
            <b>Giảm thêm {props.numberB}</b>
              {/* Giảm thêm 1% khi mua các sản phẩm thuộc nhóm hàng phụ <br /> kiện
              còn lại */}
              {props.titleUDMHb}
            </p>
          </TitleP>

          <TitleP>
          <span style={{fontSize:"50px"}}>
            {props.iconUDMHc}
            </span> 
            <p>
            <b>Giảm thêm {props.numberC}</b>
              {/* Giảm thêm 5% (tối đa 100.000đ) khi sử dụng các dịch vụ
              <br /> sửa chữa tại Điện Thoại Vui */}
              {props.titleUDMHc}
            </p>
          </TitleP>

          <TitleP>
          <span style={{fontSize:"50px"}}>
            {props.iconUDMHd}
            </span> 
            <p>
            <b>Giảm thêm {props.numberD}</b>
              {/* Giảm thêm 5% (tối đa 200.000đ) khi thực hiện thu cũ lên đời */}
              {props.titleUDMHd}
            </p>
          </TitleP>
          <TitleP>
          <span style={{fontSize:"50px"}}>
            {props.iconUDMH_D}
            </span> 
            <p>
            <b>{props.number_D}</b>
              {/* Giảm thêm 5% (tối đa 200.000đ) khi thực hiện thu cũ lên đời */}
              {props.titleUDMH_D}
            </p>
          </TitleP>
          <TitleP>
          <span style={{fontSize:"50px"}}>
            {props.iconUDMHe}
            </span> 
            <p>
                <span>Ưu đãi sinh nhật:</span>
              {/* Ưu đãi sinh nhật: Tặng phiếu mua hàng trị giá 50.000đ (Code <br />{" "}
              chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào,
              <br /> sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị
              code) */}
              {props.titleUDMHe}
            </p>
          </TitleP>
        </UDMH>

        <CSPV>
          <TitleRed>
            <GiShoppingCart fontSize="30" />
            <h3>Chính sách phục vụ</h3>
          </TitleRed>
          <TestCenter>
            <p>
              {props.notIncentives}
            </p>
          </TestCenter>
          <SVip>
            <TitleP>
            <span style={{fontSize:"50px"}}>
            {props.iconSvip}
            </span>
            <p> {props.titleSvip}</p>
            </TitleP>
              <TitleP>
              <span style={{fontSize:"50px"}}>
            {props.iconSupport}
            </span>
              <p>{props.SvipPhoneNumber}</p>
              </TitleP>
            </SVip>
        </CSPV>
      </FlexCenter>
    </>
  );
}
