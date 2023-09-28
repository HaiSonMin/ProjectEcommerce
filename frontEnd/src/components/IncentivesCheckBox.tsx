import { useState } from "react";
import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;
const Round = styled.div``;
const NameTag = styled.p``;
const CSSinput = styled.input`
  width: 30px;
  height: 30px;
  
`;
const SpanIcon = styled.div`
  color: red;
  
  
  
`
const BorderColor = styled.div`
  border: 1px red solid;
  border-radius: 50%;
  padding: .5rem;
`

export default function IncentivesCheckBox(props) {

  return (
    <CheckboxContainer>
      <div style={props.STYLEss}>
      <SpanIcon>{props.Icons}</SpanIcon>
      </div>
      <NameTag>{props.NameTag}</NameTag>
      <Round>
        <CSSinput
          type="radio"
          checked={props.Checked}
          onChange={props.OnChange}
        />
      </Round>
    </CheckboxContainer>
  );
}
