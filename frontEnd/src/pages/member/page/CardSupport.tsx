import styled from "styled-components"

const ContainerCard = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid silver;
    padding: 1rem;
    border-radius: 1rem;
`
const SpanIcon = styled.span`
    font-size: 50px;
`
const SpanRed = styled.span`
     color: red;
`
export default function CardSupport(props : {Icon : any , Details: String ,Number: string}) {
  return (
    <ContainerCard>
        <SpanIcon>
            {props.Icon}
            </SpanIcon>
        <div>
            <span>{props.Details}</span> <br />
            <SpanRed>{props.Number}</SpanRed>
        </div>
    </ContainerCard>
  )
}
