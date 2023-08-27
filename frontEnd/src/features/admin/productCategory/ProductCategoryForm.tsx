import { useForm } from "react-hook-form";
import { IBrand, IProductCategory } from "@/interfaces";
import UseProductCategoryApi from "./UseProductCategoryApi";
import {
  Button,
  InputFile,
  Form,
  FormRow,
  Input,
  Heading,
  SelectMulti,
  SelectMultiV2,
} from "@/components";
import { useState, useRef } from "react";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/helpers/ISelectOption";
import { useMoveBack } from "@/hooks";
import UseProductCategoryGroupApi from "../productCategoryGroup/UseProductCategoryGroupApi";
import { PRODUCT_CATEGORY_TYPE } from "@/constant";
import { UseBrandApi } from "../brand";
import { DefaultOptionType } from "antd/es/select";
interface IProps {
  productCategoryEdit?: IProductCategory;
  onCloseModal?: () => void;
}

const initializeFormProductCategory: IProductCategory = {
  _id: "",
  productCategory_group: "",
  productCategory_type: "",
  productCategory_name: "",
  productCategory_image: "",
};

export default function ProductCategoryForm(props: IProps) {
  const moveBack = useMoveBack();
  const categoryGroup: Pick<IOptionSelect, "value"> = {
    value: props.productCategoryEdit?.productCategory_group + "" || null,
  };
  const [selectCategoryGroup, setSelectCategoryGroup] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(categoryGroup);

  const categoryType: Pick<IOptionSelect, "value"> = {
    value: props.productCategoryEdit?.productCategory_type + "",
  };
  const [selectCategoryType, setSelectCategoryType] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(categoryType);

  let brandIds: Array<string> | undefined;
  let brandNames: Array<string> | undefined;
  if (props.productCategoryEdit) {
    brandIds = (
      props.productCategoryEdit?.productCategory_brands as Array<IBrand>
    )?.map((brand) => brand._id);
    brandNames = (
      props.productCategoryEdit?.productCategory_brands as Array<IBrand>
    )?.map((brand: IBrand) => brand.brand_name);
  }

  const [selectBrands, setSelectBrands] = useState<Array<string>>(
    brandIds || []
  );

  const { isCreatingProductCategory, createProductCategory } =
    UseProductCategoryApi.createCategory();
  const { isUpdatingProductCategory, updateProductCategory } =
    UseProductCategoryApi.updateCategory();
  const { isGettingProductCategoriesGroup, metadata: dataCategoriesGroup } =
    UseProductCategoryGroupApi.getAllCategoriesGroup();
  const { isGettingBrands, metadata: dataBrands } = UseBrandApi.getAllBrand();

  const isWorking =
    isGettingBrands ||
    isCreatingProductCategory ||
    isUpdatingProductCategory ||
    isGettingProductCategoriesGroup;

  const optionSelectCategoryGroup: Array<IOptionSelect> | undefined =
    dataCategoriesGroup?.productCategoriesGroup?.map?.((categoryGroup) => {
      return {
        label: categoryGroup.productCategoryGroup_name,
        value: categoryGroup._id,
      };
    });
  const optionSelectBrands: Array<DefaultOptionType> | undefined =
    dataBrands?.brands?.map?.((brand) => {
      return {
        label: brand.brand_name,
        value: brand.brand_name,
        image: brand.brand_image,
      };
    });

  const optionSelectCategoryType: Array<IOptionSelect> = Object.values(
    PRODUCT_CATEGORY_TYPE
  )
    .sort()
    .map((value) => {
      return {
        label: value,
        value: value,
      };
    });

  // Value for edit
  const { _id: editId, ...editValues } =
    props.productCategoryEdit ?? initializeFormProductCategory;

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors: errorsForm } = formState;

  const handlerSelectCategoryGroup = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategoryGroup(option);
  };

  const handlerSelectCategoryType = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategoryType(option);
  };

  const handlerSelectMultiBrands = (brands: Array<string>) => {
    const brandsSelected =
      dataBrands?.brands
        .filter((brand) => brands.includes(brand.brand_name))
        .map((brand) => brand._id) || [];
    console.log("brandsSelected::::", brandsSelected);
    setSelectBrands(brandsSelected);
  };

  const onSubmit = (dataFormProductCategory: any) => {
    if (!isEditSession) {
      return createProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_group: selectCategoryGroup?.value || "",
          productCategory_type: selectCategoryType?.value || "",
          productCategory_brands: selectBrands,
          productCategory_image:
            dataFormProductCategory["productCategory_image"],
        },
        {
          // onSuccess: (newData) => moveBack(),
        }
      );
    } else {
      return updateProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_group: selectCategoryGroup?.value || "",
          productCategory_type: selectCategoryType?.value,
          productCategory_brands: selectBrands,
          productCategory_image:
            dataFormProductCategory["productCategory_image"] ??
            editValues.productCategory_image,
          _id: editId,
        },
        {
          onSuccess: (newData) => moveBack(),
        }
      );
    }
  };

  return (
    <>
      <Heading $as="h1">
        {isEditSession ? "Edit Category" : "Add new category"}
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Product Category Group" error={errorsForm}>
          <Select
            id="productCategoryGroup"
            placeholder={"Select an group"}
            value={selectCategoryGroup}
            onChange={handlerSelectCategoryGroup}
            options={optionSelectCategoryGroup}
          />
        </FormRow>
        <FormRow label="Product Category Type" error={errorsForm}>
          <Select
            id="productCategoryType"
            placeholder={"Select an type"}
            value={selectCategoryType}
            onChange={handlerSelectCategoryType}
            options={optionSelectCategoryType}
          />
        </FormRow>
        <FormRow
          label="Product Category Name"
          error={errorsForm.productCategory_name}
        >
          <Input
            type="text"
            id="productCategoryName"
            {...register("productCategory_name", {
              required: "Please provide product category name",
            })}
          />
        </FormRow>
        <FormRow label="Product Brands">
          <SelectMultiV2
            options={optionSelectBrands}
            onChange={handlerSelectMultiBrands}
            defaultValues={brandNames}
            placeholder="Select brands"
            id="productCategory_brand"
          />
        </FormRow>
        {!isEditSession ? (
          <FormRow
            label="Product Category Image"
            error={errorsForm.productCategory_image}
          >
            <InputFile
              id="productCategoryImage"
              accept="image/*"
              {...register("productCategory_image", {
                required: "Please provide product category image",
              })}
            />
          </FormRow>
        ) : (
          <FormRow label="Product Category Image">
            <InputFile
              id="productCategoryImage"
              accept="image/*"
              {...register("productCategory_image")}
            />
          </FormRow>
        )}
        <FormRow>
          <Button type="reset" $variation="secondary" onClick={moveBack}>
            Cancel
          </Button>
          {!isEditSession ? (
            <Button disabled={isWorking}>
              {isWorking ? "Creating...." : "Create category"}
            </Button>
          ) : (
            <Button disabled={isWorking}>
              {isWorking ? "Editing...." : "Edit category"}
            </Button>
          )}
        </FormRow>
      </Form>
    </>
  );
}
