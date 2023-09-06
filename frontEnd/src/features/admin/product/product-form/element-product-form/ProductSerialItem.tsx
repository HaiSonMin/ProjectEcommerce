import { styled } from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProductOption } from "@/helpers";
import { FormRow, Heading, InputFile } from "@/components";
import { Input } from "antd";

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
  productOptions: Array<IProductOption>;
  handlerDeleteProductSerial: (
    indexOption: number,
    indexSerial: number
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
}

export default function ProductSerialItem({
  indexSerial,
  indexOption,
  productOptions,
  handlerDeleteProductSerial,
  handlerChangeProductSerialName,
  handlerChangeProductSerialPrice,
  handlerChangeProductSerialImage,
}: IProps) {
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
            !productOptions[indexOption]?.product_serials?.[indexSerial]
              .product_serialName && "Please provide product serial name"
          }
        >
          <Input
            placeholder="Tên serial"
            id="serialName"
            onChange={(event) =>
              handlerChangeProductSerialName(event, indexOption, indexSerial)
            }
          />
        </FormRow>
        <FormRow label="Giá trên lệch so với option">
          <Input
            defaultValue={0}
            type="number"
            placeholder="Giá chênh lệch"
            id="serialPriceDifference"
            onChange={(event) =>
              handlerChangeProductSerialPrice(event, indexOption, indexSerial)
            }
          />
        </FormRow>
        <FormRow label="Serial image">
          <InputFile
            id="serialImage"
            accept="image/*"
            onChange={(event) =>
              handlerChangeProductSerialImage(event, indexOption, indexSerial)
            }
          />
        </FormRow>
      </div>
    </ProductSerialItemStyled>
  );
}
