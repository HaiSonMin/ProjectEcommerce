

import styled from "styled-components";

const ContainerInformation = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  p:nth-child(1) {
  }
  :nth-child(2) {
    color: red;
    font-size: 4rem;
  }
  p:last-child {
  }
`;



export default function InputMember(props : {TagDate :string , Icon: any ,TimeDate: string, DateCreat:string}) {
  return (
    <ContainerInformation>
     <p>{props.TagDate} <br /> {props.TimeDate}</p>
       {props.Icon}
      <p>{props.DateCreat} </p>
    </ContainerInformation>
  )
}






