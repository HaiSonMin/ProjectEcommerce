import { useState } from "react";
import styled from "styled-components";
import SmemberButton from "./rank-member/SmemberButton";
import IncentivesDetailsOne from './../../../components/IncentivesDetailsOne';
import IncentivesDetailsTwo from "@/components/IncentivesDetailsTwo";
import IncentivesDetailsThree from "@/components/IncentivesDetailsThree";
import IncentivesDetailsNull from "@/components/IncentivesDetailsNull";
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
  width: 60px;
  height: 50px;
`;
const LogoContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  margin-top: 1rem;
  width: 60px;
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
  border: 1px solid #ebe2e2;
`;
const DivIcon = styled.div`
  position: relative;
  left: 44%;
  cursor: pointer;
`;
const LogoGoVip = styled.div``;

const ItemCenter = styled.div`
  text-align: center;
`;
const TitleRed = styled.div`
  background-color: red;
  padding: 0 1rem;
  color: white;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  text-align: center;
  justify-content: center;
  margin: 0 28%;
  margin-top: 9%;
  padding: 1rem;
`;
const ShowcontentRankMember = styled.div`
  display: grid;
  justify-content: center;
  width: 700px;
  margin-top: 2rem;
  margin-left: 20%;
  
`
export default function RankMember() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementTwo, setSelectedElementTwo] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(<IncentivesDetailsOne/>);
  const isElementSelectedTwo = (element: any) => {
    return element === selectedElementTwo;
  };
  const isElementSelectedThree = (element: any) => {
    return element === selectedElementTwo;
  };
  const handleElementClickTwo = (item: any) => {
    setSelectedElementTwo(item);
    setShowContent(true);
    if (item === "element1") {
      setSelectedComponent(<IncentivesDetailsNull/>);
    } else if (item === "element2") {
      setSelectedComponent(<IncentivesDetailsOne/>);
    } else if (item === "element3") {
      setSelectedComponent(<IncentivesDetailsTwo/>);
    }
    else if (item === "element4") {
      setSelectedComponent(<IncentivesDetailsThree/>);
    }
  };
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
      <TitleRed>
        <h2>ĐIỀU KIỆN VÀ ƯU ĐÃI CHO CÁC CẤP ĐỘ SMEMBER</h2>
      </TitleRed>
      <ItemCenter>
         <SmemberButton
         HandleShowContent= {handleElementClickTwo}
         element1="element1"
         element2="element2"
         element3 = "element3"
         element4 = "element4"
         isElementSpan= {isElementSelectedTwo}
         isElementLogo = {isElementSelectedThree}
         
         />
      </ItemCenter>
      <ShowcontentRankMember>
      {showContent && selectedComponent}
      </ShowcontentRankMember>
    </ContainerRankMember>
  );
}
