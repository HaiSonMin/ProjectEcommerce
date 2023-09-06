import { styled } from "styled-components";
import { useState } from "react";
import JoditEditor from "jodit-react";
import { IProductOption } from "@/helpers";
import ProductSerialItem from "./ProductSerialItem";
import { FormRow, FormRowContent, Heading, Input } from "@/components";
import ProductSpecificationMain from "./ProductSpecificationMain";

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
  color: #fff;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

interface IProps {
  indexOption: number;
  productOptions: Array<IProductOption>;
  handlerAddProductSerial: (indexOption: number) => void;
  handlerDeleteProductSerial: (
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductOptionName: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => void;
  handlerChangeProductOptionPrice: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => void;
  handlerChangeProductSerialName: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductSerialPrice: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductSerialImage: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductOptionDescription: (
    description: string,
    indexOption: number
  ) => void;
  handlerChangeProductOptionSpecificationMain: (
    specification: string,
    indexOption: number
  ) => void;
  handlerChangeProductOptionSpecificationDetail: (
    specification: string,
    indexOption: number
  ) => void;
}

export default function ProductOptionComponent({
  indexOption,
  productOptions,
  handlerAddProductSerial,
  handlerDeleteProductSerial,
  handlerChangeProductOptionName,
  handlerChangeProductOptionPrice,
  handlerChangeProductSerialName,
  handlerChangeProductSerialImage,
  handlerChangeProductSerialPrice,
  handlerChangeProductOptionDescription,
  handlerChangeProductOptionSpecificationMain,
  handlerChangeProductOptionSpecificationDetail,
}: IProps) {
  const [haveSerials, setHaveSerials] = useState<boolean>(false);

  return (
    <ProductOptionComponentStyled>
      <ProductOption>
        <div className="header">
          <Heading $as="h4">Product Option</Heading>
          <div className="header--checkbox">
            (
            <Input
              type="checkbox"
              id="checkBox"
              onChange={() => setHaveSerials(!haveSerials)}
            />
            <label htmlFor="checkBox">Có serials</label>)
          </div>
        </div>
        <div className="body">
          <FormRow
            label="Tên Option"
            error={
              !productOptions[indexOption].product_optionName &&
              "Please provide product option name"
            }
          >
            <Input
              placeholder="Tên Option"
              id="optionName"
              onChange={(e) => handlerChangeProductOptionName(e, indexOption)}
            />
          </FormRow>
          <FormRow label="Giá chênh lệch với giá gốc">
            <Input
              defaultValue={0}
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
                {productOptions[indexOption]?.product_serials?.map(
                  (serial, indexSerial) => (
                    <ProductSerialItem
                      key={serial.id}
                      productOptions={productOptions}
                      indexSerial={indexSerial}
                      indexOption={indexOption}
                      handlerChangeProductSerialImage={
                        handlerChangeProductSerialImage
                      }
                      handlerDeleteProductSerial={handlerDeleteProductSerial}
                      handlerChangeProductSerialName={
                        handlerChangeProductSerialName
                      }
                      handlerChangeProductSerialPrice={
                        handlerChangeProductSerialPrice
                      }
                    />
                  )
                )}
              </div>
            </>
          )}
        </div>
      </ProductOption>

      <ProductSpecificationMain/>

      <FormRowContent label="Thông số kĩ thuật chi tiết">
        <JoditEditor
          value={""}
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
          value={""}
          onChange={(description: string) =>
            handlerChangeProductOptionDescription(description, indexOption)
          }
        />
      </FormRowContent>
    </ProductOptionComponentStyled>
  );
}
