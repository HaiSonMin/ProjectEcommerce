import InputFloat from "@/components/shared/InputFloat";
import styled from "styled-components";

const ContainerPurchaseHistory = styled.div``;
const StartContent = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80%;
  img {
    width: 80px;
  }
`;
const MainContainer = styled.div``;
export default function MemberAccountLayout() {
  return (
    <>
      <ContainerPurchaseHistory>
        <StartContent>
          <img
            src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="logo-avatar"
          />
          <p>
            {" "}
            <b>my name</b>
          </p>
        </StartContent>
        <MainContainer>
          <InputFloat />
        </MainContainer>
      </ContainerPurchaseHistory>
    </>
  );
}
