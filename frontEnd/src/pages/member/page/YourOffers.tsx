import { useState } from "react";
import styled from "styled-components";
import SmemberButton from "./rank-member/SmemberButton";
import SMem from "./rank-member/SMem";
import SNull from "./rank-member/SNull";
import SNew from "./rank-member/SNew";
import SVip from "./rank-member/SVip";

const ContainerDiscout = styled.div`
  width: 100vh;
`;
const TaskBar = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  text-align: center;
  background-color: #cec6c6;
  padding: 0.2rem;
  border-radius: 8px;
`;
const TaskBarItem = styled.div`
  border-radius: 8px;
  p {
    margin: 0;
    padding: 0.3rem;
  }
`;


const ItemCenter = styled.div`
  text-align: center;
  margin: 2rem;
`;



const TaskBarBottom = styled.div`
  color: red;
  text-align: center;
  width: 400px;
`;
const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  font-size: 20px;
  border-bottom: 6px solid #c5b5b5;
  justify-content: center;
  height: 39px;
  width: 800px;
  margin-left: 10%;
`;
const ShowcontentRankMember = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  
`
export default function Discout() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElementOne, setSelectedElementOne] = useState(null);
  const [selectedElementTwo, setSelectedElementTwo] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(<SNull/>);
  const [showContent, setShowContent] = useState(false);
  const handleElementClick = (element: any) => {
    setSelectedElement(element);
  };
  const isElementSelected = (element: any) => {
    return element === selectedElement;
  };
  const isElementSelectedTwo = (element: any) => {
    return element === selectedElementTwo;
  };
  const isElementSelectedThree = (element: any) => {
    return element === selectedElementTwo;
  };
  const handleElementClickOne = (item: any) => {
    setSelectedElementOne(item);
  };
  const isElementSelectedOne = (item: any) => {
    return item === selectedElementOne;
  };
  const handleElementClickTwo = (item: any) => {
    setSelectedElementTwo(item);
    setShowContent(true);
    if (item === "element1") {
      setSelectedComponent(<SNull/>);
    } else if (item === "element2") {
      setSelectedComponent(<SNew/>);
    } else if (item === "element3") {
      setSelectedComponent(<SMem/>);
    }
    else if (item === "element4") {
      setSelectedComponent(<SVip/>);
    }
  };
  const defaultStyle = {
    backgroundColor: "white",
    color: "red",
    boxShadow: "2px 2px silver",
  };

  const selectedStyle = {
    transition: "border 0.3s ease",
    border: "2px solid transparent",
  };
  const defaultStyle1 = {
    borderBottom: "6px solid red",
    paddingBottom: "3px",
    
  };
  const selectedStyle1 = {
    borderBottom: "6px solid #c5b5b5",
    paddingBottom: "3px",
    
  };

  return (
    <ContainerDiscout>
      <TaskBar>
        <TaskBarItem
          style={isElementSelected("element1") ? defaultStyle : selectedStyle}
          onClick={() => handleElementClick("element1")}
        >
          <p>Ưu đãi Smember</p>
        </TaskBarItem>
        <TaskBarItem
          style={isElementSelected("element2") ? defaultStyle : selectedStyle}
          onClick={() => handleElementClick("element2")}
        >
          <p>Quà của bạn</p>
        </TaskBarItem>
      </TaskBar>
      <ItemCenter>
        {selectedElement === "element1" && (
         <SmemberButton
         HandleShowContent= {handleElementClickTwo}
         element1="element1"
         element2="element2"
         element3 = "element3"
         element4 = "element4"
         isElementSpan= {isElementSelectedTwo}
         isElementLogo = {isElementSelectedThree}
         
         />
        )}
        {selectedElement === "element2" && <p>Bạn chưa có quà tặng</p>}
      </ItemCenter>
      <BottomContainer>
        <TaskBarBottom
          style={isElementSelectedOne("item1") ? defaultStyle1 : selectedStyle1}
          onClick={() => handleElementClickOne("item1")}
        >
          <span>Ưu đãi mua hàng</span>
        </TaskBarBottom>
        <TaskBarBottom
          style={isElementSelectedOne("item2") ? defaultStyle1 : selectedStyle1}
          onClick={() => handleElementClickOne("item2")}
        >
          <span>Chính sách phục vụ</span>
        </TaskBarBottom>
      </BottomContainer>
      <ShowcontentRankMember>
      {showContent && selectedComponent}
      </ShowcontentRankMember>
    </ContainerDiscout>
  );
}
