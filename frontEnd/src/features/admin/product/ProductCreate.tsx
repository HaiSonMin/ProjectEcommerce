import { useMemo, useState } from "react";
import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  InputFile,
  FromHeading,
  FormRowContent,
  FromBox,
} from "@/components";
import Select, { SingleValue } from "react-select";
import { useMoveBack } from "@/hooks";
import { UseBrandApi } from "../brand";
import { useForm } from "react-hook-form";
import UseProductApi from "./UseProductApi";
import IOptionSelect from "@/helpers/ISelectOption";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
import JoditEditor from "jodit-react";
import { IBrand, IDemand } from "@/interfaces";

export default function ProductCreate() {
  const moveBack = useMoveBack();
  const [productPromotion, setProductPromotion] = useState<string>("");
  const [selectBrand, setSelectBrand] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectCategory, setSelectCategory] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectDemand, setSelectDemand] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  const { isCreatingProduct, createProduct } = UseProductApi.createProduct();
  const { handleSubmit, formState, register } = useForm();
  const { errors: errorsForm } = formState;
  const { metadata: categories, isGettingProductCategories } =
    UseProductCategoryApi.getAllCategories();
  const { metadata: category, isGettingProductCategory } =
    UseProductCategoryApi.getCategoryById(selectCategory?.value || "");

  const optionsCategory: Array<IOptionSelect> | undefined = useMemo(() => {
    return categories?.productCategories?.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  }, [isGettingProductCategories]);

  const optionsBrands: Array<IOptionSelect> | undefined = useMemo(() => {
    if (isGettingProductCategory) return;
    return (category?.productCategory_brands as Array<IBrand>)?.map((brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    });
  }, [selectCategory, isGettingProductCategory]);

  const optionsDemands: Array<IOptionSelect> | undefined = useMemo(() => {
    if (isGettingProductCategory) return;
    return (category?.productCategory_demands as Array<IDemand>)?.map(
      (demand) => {
        return {
          value: demand._id,
          label: demand.demand_name,
        };
      }
    );
  }, [selectCategory, isGettingProductCategory]);

  const handlerSelectCategory = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategory(option);
  };
  const handlerSelectBrand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectBrand(option);
  };
  const handlerSelectDemand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectDemand(option);
  };

  const onSubmit = (dataForm: any) => {
    const dataCreate = {
      product_name: dataForm["product_name"],
      product_brand: selectBrand?.value || "",
      product_category: selectCategory?.value || "",
      product_thumb: dataForm["product_thumb"],
      product_images: dataForm["product_images"],
      product_imagesInfo: dataForm["product_imagesInfo"],
      product_price: dataForm["product_price"],
      product_color: dataForm["product_color"],
      product_colorCode: dataForm["product_colorCode"],
      product_imageColor: dataForm["product_imageColor"],
    };
    console.log(dataCreate);
    // createProduct(dataCreate, { onSuccess: () => moveBack() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FromHeading>
        <Heading $as="h2">Product Info</Heading>
      </FromHeading>
      <FromBox>
        <FormRow label="Product Name" error={errorsForm["product_name"]}>
          <Input
            type="text"
            id="productName"
            {...register("product_name", {
              required: "Please provide product name",
            })}
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
        <FormRow label="Product Brand" error={errorsForm}>
          <Select
            id="productBrand"
            placeholder={"Select an brand"}
            value={selectBrand}
            onChange={handlerSelectBrand}
            options={optionsBrands}
          />
        </FormRow>
        <FormRow label="Product Demand" error={errorsForm}>
          <Select
            id="productDemand"
            placeholder={"Select an demand"}
            value={selectDemand}
            onChange={handlerSelectDemand}
            options={optionsDemands}
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
        <FormRowContent label="Product Promotion">
          <JoditEditor
            value={productPromotion}
            onChange={(promotion) => setProductPromotion(promotion)}
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
      </FromBox>
    </Form>
  );
}
