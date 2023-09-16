import styled from "styled-components";

const ContainerSupport = styled.div``;
const TitleSupport = styled.div``;
const ImgLogoTitle = styled.img``;
const ContentBox = styled.div`
p{

}
span{

}
`;

export default function Support() {
  return (
    <ContainerSupport>
      <TitleSupport>
        <ImgLogoTitle />
        <ContentBox>
          <p></p>
          <span></span>
        </ContentBox>
      </TitleSupport>
    </ContainerSupport>
  );
}
