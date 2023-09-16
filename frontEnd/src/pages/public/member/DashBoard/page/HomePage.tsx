import React from 'react';
import { AiFillGift } from 'react-icons/ai';
import { GiFactoryArm } from 'react-icons/gi';
import styled from 'styled-components';

const ContainerHomePage = styled.div`
  /* CSS cho ContainerHomePage */
`;

const InformationShow = styled.div`
  /* CSS cho InformationShow */
`;

const Profile = styled.div`
  /* CSS cho Profile */
`;

const Logo = styled.img`
  /* CSS cho Logo */
`;

const Hello = styled.p`
  /* CSS cho Hello */
`;

const NameAccount = styled.h2`
  /* CSS cho NameAccount */
`;

const InformationBasic = styled.div`
  /* CSS cho InformationBasic */
`;

const DateCreateAccount = styled.div`
  /* CSS cho DateCreateAccount */
`;

const Date = styled.h4`
  /* CSS cho Date */
`;

const RankAccount = styled.div`
  /* CSS cho RankAccount */
`;

const Rank = styled.h4`
  /* CSS cho Rank */
`;

const Point = styled.div`
  /* CSS cho Point */
`;

const Paner = styled.div`
  /* CSS cho Paner */
`;

const Tip = styled.div`
  /* CSS cho Tip */
  button{

  }
`;
const TipsDetail = styled.div`
  /* CSS cho Tip */
  h3{

  }
  p{

  }
`;
const InformationDetail = styled.div`
  /* CSS cho InformationDetail */
`;
const BoxDetail = styled.div`
    
`
const HotDeal = styled.div`
  /* CSS cho HotDeal */
`;

export default function Homepage() {
  const date = "01/01/2022";
  return (
    <ContainerHomePage>
      <InformationShow>
        <Profile>
          <Logo src="" alt="avatar" />
          <Hello></Hello>
          <NameAccount></NameAccount>
        </Profile>
        <InformationBasic>
          <DateCreateAccount>
            <Date>Ngày tham gia</Date>
          </DateCreateAccount>
          <RankAccount>
            <Rank>Hạng hội viên</Rank>
          </RankAccount>
          <Point>
            <Date>Điểm tích lũy từ {date} </Date>
          </Point>
        </InformationBasic>
      </InformationShow>
      <Paner></Paner>
      <Tip>
        <TipsDetail>
            <h3>Tips</h3>
            <p>Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt hàng nhanh và thuận tiện hơn.</p>
        </TipsDetail>
        <button>Cập nhật</button>
      </Tip>
      <InformationDetail>
            <BoxDetail>
                <AiFillGift/>
                <h2>Ưu đãi của bạn</h2>
                <p>0 ưu đãi</p>
                <button>Xem chi tiết</button>
            </BoxDetail>
            <BoxDetail>
                <AiFillGift/>
                <h2>Ưu đãi của bạn</h2>
                <p>0 ưu đãi</p>
                <button>Xem chi tiết</button>
            </BoxDetail>
            <BoxDetail>
                <AiFillGift/>
                <h2>Ưu đãi của bạn</h2>
                <p>0 ưu đãi</p>
                <button>Xem chi tiết</button>
            </BoxDetail>
      </InformationDetail>
      <Paner></Paner>
      <HotDeal></HotDeal>
    </ContainerHomePage>
  );
}
