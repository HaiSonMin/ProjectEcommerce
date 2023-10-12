import {
  Heading,
  Input,
  InputLabel,
  TextArea,
  TextAreaLabel,
} from "@/components";
import { styled } from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useProductOption } from "../context/ProductOptionProvider";
import { isInputElement } from "react-router-dom/dist/dom";

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
  color: var(--color-white);
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

    &:nth-child(1) {
      width: 30%;
    }

    &:nth-child(2) {
      width: 70%;
    }
  }
`;

interface IProps {
  indexOption: number;
}

export default function ProductSpecificationMain({ indexOption }: IProps) {
  const {
    productOptions,
    handlerAddProductOptionSpecificationMain,
    handlerChangeProductOptionSpecificationMainType,
    handlerChangeProductOptionSpecificationMainValue,
    handlerDeleteProductOptionSpecificationMain,
  } = useProductOption();
  return (
    <ProductSpecificationMainStyled>
      <div className="header">
        <Heading $as="h4">Specification Main</Heading>
        <BtnAddSpecification
          onClick={() => handlerAddProductOptionSpecificationMain(indexOption)}
        >
          Add New Specification Main
        </BtnAddSpecification>
      </div>
      <SpecBox>
        {productOptions[indexOption].product_specificationMain.map(
          (spec, indexSpec) => {
            return (
              <SpecificationItem key={spec.id}>
                <InputLabel
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlerChangeProductOptionSpecificationMainType(
                      e,
                      indexOption,
                      indexSpec
                    )
                  }
                  type="text"
                  placeHolder="Thuộc tính"
                  value={spec.specKey}
                />
                <TextAreaLabel
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handlerChangeProductOptionSpecificationMainValue(
                      e,
                      indexOption,
                      indexSpec
                    )
                  }
                  placeHolder="Thông số kỹ thuật"
                  value={spec.specValue}
                />
                <RiDeleteBin5Line
                  onClick={() =>
                    handlerDeleteProductOptionSpecificationMain(
                      indexOption,
                      indexSpec
                    )
                  }
                />
              </SpecificationItem>
            );
          }
        )}
      </SpecBox>
    </ProductSpecificationMainStyled>
  );
}
