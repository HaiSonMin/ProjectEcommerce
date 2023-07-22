import { useReducer, useState } from "react";
import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  InputFile,
  InputColor,
  FormRowContent,
} from "../../../components";
import Select from "react-select";
import JoditEditor from "jodit-react";
import { UseBrandApi } from "../brand";
import { CONSTANT } from "../../../utils";
import { useForm } from "react-hook-form";
import UseProductApi from "./UseProductApi";
import { useMoveBack } from "../../../hooks";
import { IProductCreateType } from "../../../featureTypes/IProductType";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import { SingleValue } from "react-select";

interface IProps {}

type OptionSelectType = {
  value: string;
  label: string;
};

interface IInitializeType {}

export default function ProductCreate(props: IProps) {
  const moveBack = useMoveBack();
  const [contentDescription, setContentDescription] = useState<string>(null);
  const [selectBrand, setSelectBrand] =
    useState<Pick<OptionSelectType, "value">>(null);
  const [selectCategory, setSelectCategory] =
    useState<Pick<OptionSelectType, "value">>(null);
  const [selectRom, setSelectRom] =
    useState<Pick<OptionSelectType, "value">>(null);
  const [selectRam, setSelectRam] =
    useState<Pick<OptionSelectType, "value">>(null);

  // if(!selectBrand) errorBrand.

  const { isCreatingProduct, createProduct } = UseProductApi.createProduct();
  const { handleSubmit, reset, formState, register } = useForm();
  const { errors: errorsForm } = formState;
  const { metadata: brandInfo } = UseBrandApi.getAllBrand();
  const { metadata: categoryInfo } = UseProductCategoryApi.useGetAllCategory();

  const optionsBrands: Array<OptionSelectType> = brandInfo?.brands.map(
    (brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    }
  );
  const optionsCategory: Array<OptionSelectType> =
    categoryInfo?.productCategories.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  const optionsRam: Array<OptionSelectType> = Object.keys(CONSTANT.RAM).map(
    (item) => {
      return { value: item, label: item };
    }
  );
  const optionsRom: Array<OptionSelectType> = Object.keys(CONSTANT.ROM).map(
    (item) => {
      return { value: item, label: item };
    }
  );

  const handlerSelectBrand = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectBrand(option);
  };
  const handlerSelectCategory = (
    option: SingleValue<Pick<OptionSelectType, "value">>
  ) => {
    setSelectCategory(option);
  };
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
    const dataCreate: IProductCreateType = {
      product_name: dataForm["product_name"],
      product_brand: selectBrand.value,
      product_category: selectCategory.value,
      product_thumb: dataForm["product_thumb"],
      product_images: dataForm["product_images"],
      product_ram: selectRam.value,
      product_rom: selectRom.value,
      product_price: +dataForm["product_price"],
      product_quantity: +dataForm["product_quantity"],
      product_color: dataForm["product_color"],
      product_colorCode: dataForm["product_colorCode"],
      product_imageColor: dataForm["product_imageColor"],
      product_description: contentDescription,
    };
    console.log(dataCreate);
    createProduct(dataCreate, { onSuccess: () => moveBack() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading $as="h1">Basic Info</Heading>
      <FormRow label="Product Name" error={errorsForm["product_name"]}>
        <Input
          type="text"
          id="productName"
          {...register("product_name", {
            required: "Please provide product name",
          })}
        />
      </FormRow>
      <FormRow label="Product Brand" error={errorsForm}>
        <Select
          id="productBrand"
          placeholder={"Select an brand"}
          value={selectBrand}
          onChange={handlerSelectBrand}
          options={optionsBrands}
        />
      </FormRow>
      <FormRow label="Product Category" error={errorsForm}>
        <Select
          id="productCategory"
          placeholder={"Select an category"}
          value={selectCategory}
          onChange={handlerSelectCategory}
          options={optionsCategory}
        />
      </FormRow>
      <FormRow
        label="Product Thumb(One Image)"
        error={errorsForm.product_thumb}
      >
        <InputFile
          accept="image/*"
          id="productThumb"
          name="product_thumb"
          {...register("product_thumb", {
            required: "Please provide product thumb",
          })}
        />
      </FormRow>
      <FormRow
        label="Product Images(Multi Image)"
        error={errorsForm.product_images}
      >
        <InputFile
          multiple
          accept="image/*"
          id="productImages"
          name="product_images"
          {...register("product_images", {
            required: "Please provide product images",
          })}
        />
      </FormRow>

      <Heading $as="h1">Main Info</Heading>
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
          name="product_color"
          id="productColor"
          {...register("product_color", {
            required: "Please provide color for product",
          })}
        />
      </FormRow>
      <FormRow label="Product Color Code" error={errorsForm.product_colorCode}>
        <InputColor
          id="productColorCode"
          name="product_colorCode"
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
          name="product_imageColor"
          {...register("product_imageColor", {
            required: "Please provide image for color of product",
          })}
        />
      </FormRow>
      <FormRowContent label="Product Description">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <Heading $as="h1">Specification product</Heading>
      <FormRowContent label="Product Specification Processor">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Graphic">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Communication">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Rear Camera">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Front Camera">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Design">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Weight">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Release Time">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Charging Technology">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Other Parameter">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRowContent label="Product Specification Other Utilities">
        <JoditEditor
          value={contentDescription}
          onBlur={(newContent) => setContentDescription(newContent)}
          onChange={(newContext) => setContentDescription(newContext)}
        />
      </FormRowContent>
      <FormRow>
        <Button type="reset" $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button disabled={isCreatingProduct}>
          {isCreatingProduct ? "Creating...." : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}
