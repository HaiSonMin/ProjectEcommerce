import { styled } from "styled-components";
import { useState } from "react";
import { randomKey } from "@/utils";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProductOption } from "@/helpers";
import { Collapse } from "antd";
import ProductOptionComponent from "./ProductOptionComponent";

const ProductFilterOptionStyled = styled.div``;

const BtnAddFilterOption = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const ProductOptionBox = styled.div``;

const ProductOptionCollapse = styled(Collapse)`
  & .ant-collapse-header {
    align-items: center !important;

    & .ant-collapse-extra {
      & svg {
        width: 1.8rem;
        height: 1.8rem;
        transition: all 0.3s;
        &:hover {
          scale: 1.1;
          color: var(--color-primary);
        }
      }
    }
  }
`;

interface IProps {
  productOptions: Array<IProductOption>;
  setProductOptions: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductOption({
  productOptions,
  setProductOptions,
}: IProps) {
  console.log("productOptions:::", productOptions);

  const handlerChangeProductOptionName = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_optionName = event.target.value;
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductOptionPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_priceDifference = Number(
      event.target.value
    );
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductSerialName = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_serials[
      indexSerial
    ].product_serialName = event.target.value;
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductSerialPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_serials[
      indexSerial
    ].product_priceDifference = Number(event.target.value);
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductSerialImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_serials[
      indexSerial
    ].product_serialImage = event.target.value;
    setProductOptions(newProductOptions);
  };

  const handlerChangeProductOptionSpecification = (
    specification: string,
    indexOption: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_specification = specification;
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductOptionDescription = (
    description: string,
    indexOption: number
  ) => {
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_description = description;
    setProductOptions(newProductOptions);
  };

  const handlerAddProductOption = () => {
    const newProductOptions: Array<IProductOption> = [
      ...productOptions,
      {
        id: randomKey(),
        product_optionName: "",
        product_description: "",
        product_specification: "",
        product_priceDifference: 0,
        product_serials: [
          {
            id: randomKey(),
            product_serialName: "",
            product_serialImage: "",
            product_priceDifference: 0,
          },
        ],
      },
    ];
    setProductOptions(newProductOptions);
  };

  const handlerAddProductSerial = (indexOption: number) => {
    const newProductOptions = [...productOptions];
    console.log("newProductOptions:::", newProductOptions);
    newProductOptions[indexOption]?.product_serials.push({
      id: randomKey(),
      product_serialName: "",
      product_serialImage: "",
      product_priceDifference: 0,
    });
    setProductOptions(newProductOptions);
  };

  const handlerDeleteProductOption = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    indexOption: number
  ) => {
    if (productOptions.length <= 1) return;
    const newProductOptions = [...productOptions];
    newProductOptions.splice(indexOption, 1);
    setProductOptions(newProductOptions);
  };

  const handlerDeleteProductSerial = (
    indexOption: number,
    indexSerial: number
  ) => {
    if (productOptions[indexOption].product_serials.length <= 1) return;
    const newProductOptions = [...productOptions];
    newProductOptions[indexOption].product_serials.splice(indexSerial, 1);
    setProductOptions(newProductOptions);
  };
  return (
    <ProductFilterOptionStyled>
      <BtnAddFilterOption onClick={handlerAddProductOption}>
        Add New Product Option
      </BtnAddFilterOption>
      <ProductOptionBox>
        <ProductOptionCollapse
          expandIconPosition={"start"}
          items={productOptions.map((option: IProductOption, indexOption) => {
            return {
              key: option.id,
              label: (
                <div>
                  Product Option {indexOption}:{" "}
                  <span className="font-bold">
                    {productOptions[indexOption].product_optionName}
                  </span>
                </div>
              ),
              children: (
                <ProductOptionComponent
                  productOptions={productOptions}
                  indexOption={indexOption}
                  handlerAddProductSerial={handlerAddProductSerial}
                  handlerDeleteProductSerial={handlerDeleteProductSerial}
                  handlerChangeProductOptionName={
                    handlerChangeProductOptionName
                  }
                  handlerChangeProductOptionPrice={
                    handlerChangeProductOptionPrice
                  }
                  handlerChangeProductSerialName={
                    handlerChangeProductSerialName
                  }
                  handlerChangeProductSerialPrice={
                    handlerChangeProductSerialPrice
                  }
                  handlerChangeProductSerialImage={
                    handlerChangeProductSerialImage
                  }
                  handlerChangeProductOptionDescription={
                    handlerChangeProductOptionDescription
                  }
                  handlerChangeProductOptionSpecification={
                    handlerChangeProductOptionSpecification
                  }
                />
              ),

              extra: (
                <RiDeleteBin5Line
                  className="delete--option"
                  onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) =>
                    handlerDeleteProductOption(e, indexOption)
                  }
                />
              ),
            };
          })}
        />
      </ProductOptionBox>
    </ProductFilterOptionStyled>
  );
}
