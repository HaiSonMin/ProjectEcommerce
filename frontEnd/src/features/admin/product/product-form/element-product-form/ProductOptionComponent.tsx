import { styled } from "styled-components";
import { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import ProductSerialItem from "./ProductSerialItem";
import { FormRow, FormRowContent, Heading, Input } from "@/components";
import ProductSpecificationMain from "./ProductSpecificationMain";
import { useProductOption } from "../context/ProductOptionProvider";

const ProductOptionComponentStyled = styled.div``;

const ProductOption = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  overflow: hidden;

  & .header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: var(--color-grey-200);
    padding: 1rem;

    & .header--checkbox {
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;

      & label {
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }

  & .body {
    padding: 1rem;
  }

  & .serials--box {
  }
`;

const BtnAddSerial = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  cursor: pointer;
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

interface IProps {
  indexOption: number;
}

export default function ProductOptionComponent({ indexOption }: IProps) {
  const [haveSerials, setHaveSerials] = useState<boolean>(true);
  const {
    productOptions,
    handlerAddProductSerial,
    handlerChangeProductOptionName,
    handlerChangeProductOptionPrice,
    handlerChangeProductOptionDescription,
    handlerChangeProductOptionSpecificationDetail,
    handlerDeleteAllProductSerial,
  } = useProductOption();

  const handlerHaveProductSerial = () => {
    if (!haveSerials) {
      setHaveSerials(true);
      handlerAddProductSerial(indexOption);
    } else {
      setHaveSerials(false);
      handlerDeleteAllProductSerial(indexOption);
    }
  };

  return (
    <ProductOptionComponentStyled>
      <ProductOption>
        <div className="header">
          <Heading $as="h4">Product Option</Heading>
          <div className="header--checkbox">
            (
            <Input
              className="mt-[4px] cursor-pointer"
              type="checkbox"
              id="checkBox"
              onChange={handlerHaveProductSerial}
              defaultChecked={haveSerials}
            />
            <label htmlFor="checkBox">Có serials</label>)
          </div>
        </div>
        <div className="body">
          <FormRow
            label="Tên Option"
            error={
              !productOptions[indexOption]?.product_optionName &&
              "Please provide product option name"
            }
          >
            <Input
              value={productOptions[indexOption]?.product_optionName}
              placeholder="Tên Option"
              id="optionName"
              onChange={(e) => handlerChangeProductOptionName(e, indexOption)}
            />
          </FormRow>
          <FormRow label="Giá chênh lệch với giá gốc">
            <Input
              value={productOptions[indexOption].product_priceDifference}
              type="number"
              placeholder="Price difference"
              id="optionPriceDifference"
              onChange={(e) => handlerChangeProductOptionPrice(e, indexOption)}
            />
          </FormRow>
          {haveSerials && (
            <>
              <BtnAddSerial
                onClick={() => handlerAddProductSerial(indexOption)}
              >
                Add new serial
              </BtnAddSerial>
              <div className="serials--box">
                {productOptions?.[indexOption]?.product_serials?.map(
                  (serial, indexSerial) => (
                    <ProductSerialItem
                      key={serial.id}
                      indexOption={indexOption}
                      indexSerial={indexSerial}
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      </ProductOption>

      <ProductSpecificationMain indexOption={indexOption} />

      <FormRowContent label="Thông số kĩ thuật chi tiết">
        <JoditEditor
          value={productOptions[indexOption].product_specificationDetail}
          onChange={(specification: string) =>
            handlerChangeProductOptionSpecificationDetail(
              specification,
              indexOption
            )
          }
        />
      </FormRowContent>
      <FormRowContent label="Mô tả sản phẩm">
        <JoditEditor
          value={productOptions[indexOption].product_description}
          onChange={(description: string) =>
            handlerChangeProductOptionDescription(description, indexOption)
          }
        />
      </FormRowContent>
    </ProductOptionComponentStyled>
  );
}
