import { Heading, Input, TextArea } from "@/components";
import { styled } from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductSpecificationMainStyled = styled.div`
  margin-top: 1.5rem;
  border-radius: 1rem;
  overflow: hidden;
  & .header {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
    background-color: var(--color-grey-200);
    padding: 1rem;
  }
`;

const BtnAddSpecification = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

const SpecBox = styled.div`
  border: 1px solid var(--color-grey-200);
`;

const SpecificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem;
  border: 1px solid var(--color-grey-200);

  & svg {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }

  & .box {
    align-self: start;
    display: flex;
    align-items: center;
    gap: 1rem;
    & label {
      white-space: nowrap;
    }

    &:nth-child(1) {
      width: 30%;
    }

    &:nth-child(2) {
      width: 70%;
    }
  }
`;

interface IProps {
  handlerAddSpecificationMain: any;
}

export default function ProductSpecificationMain({
  handlerAddSpecificationMain,
}: IProps) {
  return (
    <ProductSpecificationMainStyled>
      <div className="header">
        <Heading $as="h4">Specification Main</Heading>
        <BtnAddSpecification onClick={handlerAddSpecificationMain}>
          Add New Specification Main
        </BtnAddSpecification>
      </div>
      <SpecBox>
        <SpecificationItem>
          <Input type="text" placeholder="Thuộc tính" />
          <TextArea placeholder="Thông số kỹ thuật" />
          <RiDeleteBin5Line />
        </SpecificationItem>
      </SpecBox>
    </ProductSpecificationMainStyled>
  );
}
