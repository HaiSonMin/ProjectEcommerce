import { useState } from "react";
import {
  Input,
  Form,
  FormRow,
  Heading,
  InputFile,
  InputColor,
  Image,
  Button,
  FormRowContent,
} from "../../../components";
import Select, { SingleValue } from "react-select";
import { useForm } from "react-hook-form";
import { CONSTANT } from "../../../utils";
import IProductType, {
  IProductMainInfoType,
} from "../../../featureTypes/IProductType";
import { useMoveBack } from "../../../hooks";
import UseProductApi from "./UseProductApi";
import JoditEditor from "jodit-react";

interface IProps {
  product: IProductType;
  product_mainInfo?: IProductMainInfoType;
}

type OptionSelectType = {
  value: string;
  label: string;
};


export default function ProductMainInfoForm(props: IProps) {
  const moveBack = useMoveBack();
  const [contentDescription, setContentDescription] = useState<string>(
    props.product_mainInfo?.product_description || ""
  );

  const optionsRam: Array<OptionSelectType> = Object.keys(CONSTANT.RAM).map(
    (item: string) => {
      return { value: item, label: item };
    }
  );
  const optionsRom: Array<OptionSelectType> = Object.keys(CONSTANT.ROM).map(
    (item: string) => {
      return { value: item, label: item };
    }
  );

  const ram: Pick<OptionSelectType, "value"> = {
    value: props.product_mainInfo?.product_ram || "",
  };
  const rom: Pick<OptionSelectType, "value"> = {
    value: props.product_mainInfo?.product_rom || "",
  };

  const [selectRam, setSelectRam] =
    useState<Pick<OptionSelectType, "value">>(ram);
  const [selectRom, setSelectRom] =
    useState<Pick<OptionSelectType, "value">>(rom);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: props.product_mainInfo || {},
  });
  const { errors: errorsForm } = formState;

  const { isUpdatingProduct, updateProductMainInfo } =
    UseProductApi.updateProductMainInfo();

  const { isAddingProduct, provideProductMainInfo } =
    UseProductApi.provideProductMainInfo();

  const handlerSelectRam = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectRam(option);
  };
  const handlerSelectRom = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectRom(option);
  };

  const onSubmit = (dataForm: any) => {
    const dataSubmit: IProductMainInfoType = {
      product_productId: props.product._id,
      _id: props.product_mainInfo?._id,
      product_rom: selectRom.value,
      product_ram: selectRam.value,
      product_color: dataForm["product_color"],
      product_price: dataForm["product_price"],
      product_quantity: dataForm["product_quantity"],
      product_imageColor: dataForm["product_imageColor"],
      product_colorCode: dataForm["product_colorCode"],
      product_description: contentDescription,
    };
    console.log(dataSubmit);
    if (props.product_mainInfo)
      updateProductMainInfo(dataSubmit, { onSuccess: () => moveBack() });
    else {
      delete dataSubmit._id;
      provideProductMainInfo(dataSubmit, { onSuccess: () => moveBack() });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading $as="h2">
        {props.product.product_name}:{" "}
        {props.product_mainInfo ? (
          <>
            {props.product_mainInfo.product_ram} -{" "}
            {props.product_mainInfo.product_rom} -{" "}
            {props.product_mainInfo.product_color}
          </>
        ) : (
          `Provide new ${props.product.product_name}`
        )}
      </Heading>
      <FormRow label="Chose Ram(GB)" error={errorsForm.product_ram}>
        <Select
          id="selectRam"
          name="product_ram"
          placeholder={"Select an option"}
          value={selectRam}
          onChange={handlerSelectRam}
          options={optionsRam}
        />
      </FormRow>
      <FormRow label="Chose Rom(GB)" error={errorsForm.product_rom}>
        <Select
          id="selectRom"
          name="product_rom"
          placeholder={"Select an option"}
          value={selectRom}
          onChange={handlerSelectRom}
          options={optionsRom}
        />
      </FormRow>
      <FormRow label="Product Price(USD)" error={errorsForm.product_price}>
        <Input
          id="productPrice"
          type="number"
          name="product_price"
          {...register("product_price", {
            required: "Please provide product price",
            min: {
              value: 1,
              message: "Quantity must be getter than equal 1",
            },
          })}
        />
      </FormRow>
      {props.product_mainInfo && (
        <FormRow label="Product Price AppliedDiscount(USD)">
          <Input
            disabled
            id="productPrice"
            type="number"
            name="product_price"
            {...register("product_priceAppliedDiscount")}
          />
        </FormRow>
      )}
      <FormRow
        label="Product Quantity(Unit)"
        error={errorsForm.product_quantity}
      >
        <Input
          id="productQuantity"
          type="number"
          name="product_quantity"
          {...register("product_quantity", {
            required: "Please provide product quantity",
            min: {
              value: 0,
              message: "Quantity must be getter than equal zero",
            },
          })}
        />
      </FormRow>
      {props.product_mainInfo && (
        <FormRow label="Product Sold(Unit)">
          <Input
            disabled
            type="number"
            name="product_sold"
            {...register("product_sold")}
          />
        </FormRow>
      )}

      <FormRow label="Product Color" error={errorsForm.product_color}>
        <Input
          id="productColor"
          type="string"
          name="product_color"
          {...register("product_color", {
            required: "Please provide color product",
          })}
        />
      </FormRow>
      <FormRow label="Product Color Code">
        <InputColor
          id="productColorCode"
          name="product_colorCode"
          {...register("product_colorCode")}
        />
      </FormRow>
      <FormRow
        error={!props.product_mainInfo && errorsForm.product_imageColor}
        label="Product Color Image"
        images={
          props.product_mainInfo && (
            <Image
              image={props.product_mainInfo?.product_imageColor}
              altTitle="Product thumb"
            />
          )
        }
      >
        {props.product_mainInfo ? (
          <InputFile
            id="productColorImage"
            name="product_color"
            {...register("product_imageColor")}
          />
        ) : (
          <InputFile
            id="productColorImage"
            name="product_color"
            {...register("product_imageColor", {
              required: "Please provide image color product",
            })}
          />
        )}
      </FormRow>
      <FormRowContent label="Product Description">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => newContent}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRow>
        <Button type="reset" $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {props.product_mainInfo ? (
          <Button disabled={isUpdatingProduct}>
            {isUpdatingProduct ? "Updating...." : "Update"}
          </Button>
        ) : (
          <Button disabled={isAddingProduct}>
            {isAddingProduct ? "Providing...." : "Provide"}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}
