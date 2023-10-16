import { useCallback } from "react";
import { styled } from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FormRow, Heading, ImagesGroup, Input, InputFile } from "@/components/shared";
import { useProductOption } from "../context/ProductOptionProvider";

const ProductSerialItemStyled = styled.div`
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
`;

interface IProps {
  indexSerial: number;
  indexOption: number;
}

export default function ProductSerialItem({
  indexSerial,
  indexOption,
}: IProps) {
  const {
    isEdit,
    productOptions,
    handlerDeleteProductSerial,
    handlerChangeProductSerialName,
    handlerChangeProductSerialPrice,
    handlerChangeProductSerialImage,
  } = useProductOption();

  return (
    <ProductSerialItemStyled>
      <div className="serial--item-header">
        <Heading $as="h4">Serials {indexSerial + 1}</Heading>
        <RiDeleteBin5Line
          onClick={() => handlerDeleteProductSerial(indexOption, indexSerial)}
        />
      </div>
      <div className="serial--item-box">
        <FormRow
          label="Tên serial"
          error={
            !productOptions[indexOption].product_serials?.[indexSerial]
              .serialName && "Please provide product serial name"
          }
        >
          <Input
            value={
              productOptions[indexOption]?.product_serials?.[indexSerial]
                .serialName
            }
            placeholder="Tên serial"
            id="serialName"
            onChange={(event) =>
              handlerChangeProductSerialName(event, indexOption, indexSerial)
            }
          />
        </FormRow>
        <FormRow label="Giá trên lệch so với option">
          <Input
            type="number"
            placeholder="Giá chênh lệch"
            id="serialPriceDifference"
            value={
              productOptions[indexOption]?.product_serials?.[indexSerial]
                .serialPriceDifference || 0
            }
            onChange={(event) =>
              handlerChangeProductSerialPrice(event, indexOption, indexSerial)
            }
          />
        </FormRow>
        <FormRow label="Serial image">
          {/* 
          //Handler later
          <InputFile
            numberImage={0}
            id="serialImage"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlerChangeProductSerialImage(event, indexOption, indexSerial)
            } */}
          <Input
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handlerChangeProductSerialImage(event, indexOption, indexSerial)
            }
          />
          {isEdit && (
            <ImagesGroup
              images={[
                productOptions?.[indexOption].product_serials?.[indexSerial]
                  .serialImage,
              ]}
              altTitle={`Image iphone ${productOptions?.[indexOption].product_serials?.[indexSerial].serialName}`}
            />
          )}
        </FormRow>
      </div>
    </ProductSerialItemStyled>
  );
}
