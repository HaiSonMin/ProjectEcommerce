import { styled } from "styled-components";
import { useState } from "react";
import FormRowContent from "./FormRowContent";
import JoditEditor from "jodit-react";
import Heading from "./Heading";
import Input from "./Input";
import FormRow from "./FormRow";
import InputFile from "./InputFile";
import { IProductOption } from "@/helpers";
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductOptionComponentStyled = styled.div``;

const ProductOptionHeader = styled.div`
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
    & .serial--item {
      border: 1px solid var(--color-grey-200);
      border-radius: 1rem;
      overflow: hidden;
      margin-bottom: 1rem;

      .serial--item-header {
        position: relative;
        text-align: center;
        gap: 2rem;
        background-color: var(--color-grey-200);
        padding: 6px;

        & svg {
          position: absolute;
          width: 1.8rem;
          height: 1.8rem;
          margin-top: 2px;
          top: 8px;
          right: 2rem;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            scale: 1.1;
            color: var(--color-primary);
          }
        }
      }
      .serial--item-box {
        padding: 1rem;
      }
    }
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
  handlerChangeProductOptionSpecification: (
    specification: string,
    indexOption: number
  ) => void;
  handlerChangeProductOptionDescription: (
    description: string,
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
  handlerChangeProductOptionSpecification,
}: IProps) {
  const [haveSerials, setHaveSerials] = useState<boolean>(false);
  return (
    <ProductOptionComponentStyled>
      <ProductOptionHeader>
        <div className="header">
          <Heading $as="h4">Product Option</Heading>
          <div className="header--checkbox">
            (
            <Input
              type="checkbox"
              id="checkBox"
              onChange={() => setHaveSerials(!haveSerials)}
            />
            <label htmlFor="checkBox">Have serials</label>)
          </div>
        </div>
        <div className="body">
          <FormRow
            label="Option name"
            error={
              !productOptions[indexOption].product_optionName &&
              "Please provide product option name"
            }
          >
            <Input
              placeholder="Option name"
              id="optionName"
              onChange={(e) => handlerChangeProductOptionName(e, indexOption)}
            />
          </FormRow>
          <FormRow label="Price difference">
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
                {productOptions[indexOption].product_serials.map(
                  (serial, indexSerial) => (
                    <div className="serial--item" key={serial.id}>
                      <div className="serial--item-header">
                        <Heading $as="h4">Serials</Heading>
                        <RiDeleteBin5Line
                          onClick={() =>
                            handlerDeleteProductSerial(indexOption, indexSerial)
                          }
                        />
                      </div>
                      <div className="serial--item-box">
                        <FormRow
                          label="Serial Name"
                          error={
                            !productOptions[indexOption].product_serials[
                              indexSerial
                            ].product_serialName &&
                            "Please provide product serial name"
                          }
                        >
                          <Input
                            placeholder="Serial name"
                            id="serialName"
                            onChange={(event) =>
                              handlerChangeProductSerialName(
                                event,
                                indexOption,
                                indexSerial
                              )
                            }
                          />
                        </FormRow>
                        <FormRow label="Serial price difference">
                          <Input
                            defaultValue={0}
                            type="number"
                            placeholder="Price difference"
                            id="serialPriceDifference"
                            onChange={(event) =>
                              handlerChangeProductSerialPrice(
                                event,
                                indexOption,
                                indexSerial
                              )
                            }
                          />
                        </FormRow>
                        <FormRow label="Serial image">
                          <InputFile
                            id="serialImage"
                            onChange={(event) =>
                              handlerChangeProductSerialImage(
                                event,
                                indexOption,
                                indexSerial
                              )
                            }
                          />
                        </FormRow>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </ProductOptionHeader>

      <FormRowContent label="Product Specification">
        <JoditEditor
          value={""}
          onChange={(specification: string) =>
            handlerChangeProductOptionSpecification(specification, indexOption)
          }
        />
      </FormRowContent>
      <FormRowContent label="Product Description">
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
