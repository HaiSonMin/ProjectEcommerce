import { useMemo, useState } from "react";
import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  InputFile,
  InputColor,
  FormRowContent,
} from "@/components";
import Select, { SingleValue } from "react-select";
import JoditEditor from "jodit-react";
import { UseBrandApi } from "../brand";
import { useForm } from "react-hook-form";
import UseProductApi from "./UseProductApi";
import { useMoveBack } from "@/hooks";
import { IProductCreate } from "@/interfaces/product/product.interface";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import IOptionSelect from "@/helpers/ISelectOption";

export default function ProductCreate() {
  const moveBack = useMoveBack();

  const [contentDescription, setContentDescription] = useState<string>("");
  const [selectBrand, setSelectBrand] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectCategory, setSelectCategory] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectRom, setSelectRom] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectRam, setSelectRam] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  // if(!selectBrand) errorBrand.

  const { isCreatingProduct, createProduct } = UseProductApi.createProduct();
  const { handleSubmit, formState, register } = useForm();
  const { errors: errorsForm } = formState;
  const { metadata: brandInfo } = UseBrandApi.getAllBrand();
  const { metadata: categoryInfo } = UseProductCategoryApi.getAllCategories();

  const optionsBrands: Array<IOptionSelect> | undefined = useMemo(() => {
    return brandInfo?.brands.map((brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    });
  }, []);

  const optionsCategory: Array<IOptionSelect> | undefined = useMemo(() => {
    return categoryInfo?.productCategories.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  }, []);

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

  const handlerSelectBrand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectBrand(option);
  };
  const handlerSelectCategory = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategory(option);
  };
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

  const onSubmit = (dataForm: any) => {
    const dataCreate: IProductCreate = {
      product_name: dataForm["product_name"],
      product_brand: selectBrand?.value || "",
      product_category: selectCategory?.value || "",
      product_thumb: dataForm["product_thumb"],
      product_images: dataForm["product_images"],
      product_imagesInfo: dataForm["product_imagesInfo"],
      product_ram: selectRam?.value || "",
      product_rom: selectRom?.value || "",
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
          {...register("product_images", {
            required: "Please provide product images",
          })}
        />
      </FormRow>
      <FormRow
        label="Product ImagesInfo(Multi Image)"
        error={errorsForm.product_imagesInfo}
      >
        <InputFile
          multiple
          accept="image/*"
          id="productImagesInfo"
          {...register("product_imagesInfo", {
            required: "Please provide product images information",
          })}
        />
      </FormRow>
      {/* /////////////////////////////////////////////////// */}
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
      <FormRow>
        <Button type="reset" $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button disabled={isCreatingProduct}>
          {isCreatingProduct ? "Creating...." : "Create New Product"}
        </Button>
      </FormRow>
    </Form>
  );
}
