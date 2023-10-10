import styled from "styled-components";
const ContainerRankMember = styled.div`
  padding: 1rem;
`;
const ContainerFlex = styled.div`
  background-color: red;
  padding: 0rem 1rem 1rem 1rem;
  border-radius: 0px 0px 30px 30px;
  height: 150px;
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
const Infor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Title = styled.div`
  margin: 0;
  span {
    color: white;
  }
`;
const SpanH = styled.span`
  font-size: 20px;
`;
const GotoSvip = styled.div`
  padding: 0 0.5rem;
  display: flex;
  text-align: left;
  div {
    width: 50%;
  }
`;
const ContainerGoSVip = styled.div`
  position: relative;
  top: 10px;
  border-radius: 20px;
  padding-bottom: 4rem;
  width: 96.5%;
  padding: 1rem;
  background-color: white;
  text-align: center;
`;
const DivIcon = styled.div`
  position: relative;
  left: 44%;
  cursor: pointer;
`;
const LogoGoVip = styled.div``;
export default function RankMember() {
  return (
    <ContainerRankMember>
      <ContainerFlex>
        <Infor>
          <LogoContainer>
            <Logo
              src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
              alt="avatar"
            />
          </LogoContainer>
          <Title>
            <SpanH>Xin chào</SpanH> <br />
            <span> Name </span>
          </Title>
        </Infor>
        <ContainerGoSVip>
          <GotoSvip>
            <div>
              <span>Name</span> <br />
              <span>0đ</span> <br />
              <span>(Điểm tích lũy từ 01/01/2022)</span>
            </div>
            <DivIcon>
              <LogoGoVip>
                <Logo
                  src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
                  alt="avatar"
                />
              </LogoGoVip>
              <span>N-one</span>
            </DivIcon>
          </GotoSvip>
          <span>Bạn cần mua thêm 3.000.000 ₫ để lên hạng S-New</span>
        </ContainerGoSVip>
      </ContainerFlex>
    </ContainerRankMember>
  );
}
