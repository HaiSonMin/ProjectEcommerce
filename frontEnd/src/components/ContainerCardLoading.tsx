import {  styled } from "styled-components";
import { CardLoading } from ".";
import { randomKey } from "@/utils";

const ContainerCardStyled = styled.div`
  padding: 1rem 6px;
  overflow: hidden;
`;

// All withCard + all with Gap(1rem)
const ContainerCards = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export default function ContainerCardLoading() {
  return (
    <ContainerCardStyled>
      <ContainerCards>
        <CardLoading width={23} />
        <CardLoading width={23} />
        <CardLoading width={23} />
        <CardLoading width={23} />
        <CardLoading width={23} />
      </ContainerCards>
    </ContainerCardStyled>
  );
}
