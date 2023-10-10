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


export default function IncentivesDetailsNull() {
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
                Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 0 đến 3 triệu đồng
            </p>
          </TitleP>
        </DKXH>
        <UDMH>
          <TitleRed>
            <GiWallet fontSize="30" />
            <h3>Ưu đãi mua hàng</h3>
          </TitleRed>
          <TestCenter>
            <p>
              
          Hiện chưa có ưu đãi mua hàng đặc biệt cho hạng thành viên S-Null
            </p>
          </TestCenter>
        </UDMH>

        <CSPV>
          <TitleRed>
            <GiShoppingCart fontSize="30" />
            <h3>Chính sách phục vụ</h3>
          </TitleRed>
          
          <SVip>
            <TitleP>
           
            <p>
            Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
    //           viên S-New
            </p>
            </TitleP>
            </SVip>
        </CSPV>
      </FlexCenter>
    </>
  );
}

    // <IncentivesDetails
    //   titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 0 đến 3 triệu đồng"
    //   titleUDMHa="Hiện chưa có ưu đãi mua hàng đặc biệt cho hạng thành viên S-Null"
    //   notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
    //           viên S-New"
    // />