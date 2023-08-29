import {
  FormRow,
  FormRowContent,
  FromHeading,
  Heading,
  Input,
  InputColor,
  InputFile,
} from "@/components";
import IOptionSelect from "@/helpers/ISelectOption";
import JoditEditor from "jodit-react";
import Select, { SingleValue } from "react-select";
import { styled } from "styled-components";
import { useState, useMemo } from "react";
import CONSTANT from "@/constant/value-constant";

const SpecificationPhoneStyled = styled.div``;

export default function SpecificationPhone({ register, errorsForm }) {
  const [contentDescription, setContentDescription] = useState<string>("");
  const [selectRom, setSelectRom] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectRam, setSelectRam] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  const handlerSelectRam = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectRam(option);
  };
  const handlerSelectRom = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectRom(option);
  };

  const optionsRam: Array<IOptionSelect> = useMemo(() => {
    return Object.keys(CONSTANT.RAM).map((item) => {
      return { value: item, label: item };
    });
  }, []);

  const optionsRom: Array<IOptionSelect> = useMemo(() => {
    return Object.keys(CONSTANT.ROM).map((item) => {
      return { value: item, label: item };
    });
  }, []);
  return (
    <SpecificationPhoneStyled>
      <FromHeading>
        <Heading $as="h2">Main Info</Heading>
      </FromHeading>
      <FormRow label="Product RAM" error={errorsForm.product_mainInfo}>
        <Select
          id="productRam"
          placeholder={"Select an RAM"}
          value={selectRam}
          onChange={handlerSelectRam}
          options={optionsRam}
        />
      </FormRow>
      <FormRow label="Product ROM" error={errorsForm.product_mainInfo}>
        <Select
          id="productRom"
          placeholder={"Select an ROM"}
          value={selectRom}
          onChange={handlerSelectRom}
          options={optionsRom}
        />
      </FormRow>
      <FormRow label="Product Quantity" error={errorsForm.product_mainInfo}>
        <Input
          type="number"
          id="productQuantity"
          {...register("product_quantity", {
            required: "Please provide quantity for product",
          })}
        />
      </FormRow>
      <FormRow label="Product Price" error={errorsForm.product_price}>
        <Input
          type="number"
          id="productPrice"
          {...register("product_price", {
            required: "Please provide price for product",
          })}
        />
      </FormRow>
      <FormRow label="Product Color" error={errorsForm.product_color}>
        <Input
          type="text"
          id="productColor"
          {...register("product_color", {
            required: "Please provide color for product",
          })}
        />
      </FormRow>
      <FormRow label="Product Color Code" error={errorsForm.product_colorCode}>
        <InputColor
          id="productColorCode"
          {...register("product_colorCode", {
            required: "Please provide color for product",
          })}
        />
      </FormRow>
      <FormRow
        label="Product Images For Color"
        error={errorsForm.product_imageColor}
      >
        <InputFile
          id="productImageColor"
          accept="image/*"
          {...register("product_imageColor", {
            required: "Please provide image for color of product",
          })}
        />
      </FormRow>
      <FormRowContent label="Product Description">
        <JoditEditor
          value={contentDescription}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
    </SpecificationPhoneStyled>
  );
}
