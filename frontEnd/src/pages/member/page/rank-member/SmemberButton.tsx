import React from "react";
import styled from "styled-components";

const ContainerSmember = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  align-items: center;
  gap: 7rem;
`;
const TextCenter = styled.div`
  text-align: center;
  width: 70px;
`;

const Logo = styled.img`
  width: 70px;
`;
const LogoContainer = styled.div`
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  margin-top: 1rem;
  width: 70px;
`;
const SpanColor = styled.div`
  color:black;
`
export default function SmemberButton(props: {
  HandleShowContent: Function;
  element1: String;
  element2: String;
  element3: String;
  element4: String;
  isElementSpan: any;
  isElementLogo:any;
}) {
  const selectedStyle = {
    border: "none",
  };

  const  defaultStyle = {
    borderRadius: "50%",
    border: "2px solid red",
  };
  const SpanRed = {
    color:"black"
  }
  const SpanBlack = {
    color:"red"
  }
  return (
    <ContainerSmember>
      <TextCenter onClick={() => props.HandleShowContent(props.element1)}>
        <LogoContainer  style={props.isElementLogo(`${props.element1}`) ? defaultStyle : selectedStyle} >
          <Logo
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="avatar"
          />
        </LogoContainer>
        <SpanColor style={props.isElementSpan(`${props.element1}`) ? SpanBlack : SpanRed}>
          <span>S-Null</span>
        </SpanColor>
      </TextCenter>
      <TextCenter onClick={() => props.HandleShowContent(props.element2)}>
        <LogoContainer style={props.isElementLogo(`${props.element2}`) ? defaultStyle : selectedStyle}>
          <Logo
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="avatar"
          />
        </LogoContainer>
        <SpanColor style={props.isElementSpan(`${props.element2}`) ? SpanBlack : SpanRed}>
          <span>S-New</span>
        </SpanColor>
      </TextCenter>
      <TextCenter onClick={() => props.HandleShowContent(props.element3)}>
        <LogoContainer style={props.isElementLogo(`${props.element3}`) ? defaultStyle : selectedStyle}>
          <Logo
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="avatar"
          />
        </LogoContainer>
        
        <SpanColor style={props.isElementSpan(`${props.element3}`) ? SpanBlack : SpanRed}>
          <span>S-Mem</span>
        </SpanColor>
      </TextCenter>
      <TextCenter onClick={() => props.HandleShowContent(props.element4)}>
        <LogoContainer style={props.isElementLogo(`${props.element4}`) ? defaultStyle : selectedStyle}>
          <Logo
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="avatar"
          />
        </LogoContainer>
        <SpanColor style={props.isElementSpan(`${props.element4}`) ? SpanBlack : SpanRed}>
          <span>S-Vip</span>
        </SpanColor>
      </TextCenter>
    </ContainerSmember>
  );
}
