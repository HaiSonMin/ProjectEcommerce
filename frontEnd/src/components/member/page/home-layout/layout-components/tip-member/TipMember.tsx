import Heading from "@/components/Heading";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TipMemberStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-blue-100);
  padding: 1rem 2rem;
  border-radius: 1rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-blue-700);
  }
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
  p {
    font-size: 1.2rem;
  }
`;

const ButtonUpdate = styled(Link)`
  display: inline-block;
  font-size: 1.4rem;
  padding: 2px 1rem;
  border: 1px solid var(--color-grey-700);
  border-radius: 5px;
`;

export default function TipMember() {
  return (
    <TipMemberStyled>
      <BsFillExclamationCircleFill />
      <Text>
        <Heading $as="h5">Tips</Heading>
        <p>
          Cập nhật thông tin cá nhân và địa chỉ cụ sẽ sẽ giúp bạn có trải nghiệm
          đặt hàng nhanh và thuận tiện hơn.
        </p>
      </Text>
      <ButtonUpdate to={"#"}>Cập nhật</ButtonUpdate>
    </TipMemberStyled>
  );
}
