import Heading from "@/components/shared/Heading";
import styled from "styled-components";

const RightBoardInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  padding-top: 1rem;
  padding-bottom: 3rem;
  background-color: var(--color-cream-100);

  .heading {
    text-transform: uppercase;
    background-color: var(--color-primary);
    width: fit-content;
    padding: 5px 1rem;
    color: var(--color-white);
    border-radius: 1rem;
  }
`;

export default function RightBoardInfo() {
  return (
    <RightBoardInfoStyled>
      <Heading $as="h3" className="heading">
        Chương trình nổi bật
      </Heading>
    </RightBoardInfoStyled>
  );
}
