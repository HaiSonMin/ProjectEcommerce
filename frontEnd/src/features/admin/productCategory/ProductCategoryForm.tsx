import { useForm } from "react-hook-form";
import { IProductCategory } from "@/interfaces";
import UseProductCategoryApi from "./UseProductCategoryApi";
import { Button, InputFile, Form, FormRow, Input, Heading } from "@/components";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/helpers/ISelectOption";
import { CONSTANT } from "@/utils";
import { useMoveBack } from "@/hooks";
interface IProps {
  productCategoryEdit?: IProductCategory;
  onCloseModal?: () => void;
}

const initializeFormProductCategory: IProductCategory = {
  _id: "",
  productCategory_type: "",
  productCategory_name: "",
  productCategory_image: "",
};

export default function ProductCategoryForm(props: IProps) {
  const moveBack = useMoveBack();
  const categoryType: Pick<IOptionSelect, "value"> = {
    value: props.productCategoryEdit?.productCategory_type || null,
  };
  const [selectCategoryType, setSelectCategoryType] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(categoryType);

  const { isCreatingProductCategory, createProductCategory } =
    UseProductCategoryApi.createCategory();
  const { isUpdatingProductCategory, updateProductCategory } =
    UseProductCategoryApi.updateCategory();
  const isWorking = isCreatingProductCategory || isUpdatingProductCategory;
  const optionSelectCategoryType: Array<IOptionSelect> = Object.values(
    CONSTANT.TYPE_PRODUCT_CATEGORY
  ).map((value) => {
    return { label: value, value: value };
  });

  // Value for edit
  const { _id: editId, ...editValues } =
    props.productCategoryEdit ?? initializeFormProductCategory;

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors: errorsForm } = formState;

  const handlerSelectCategoryType = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategoryType(option);
  };

  const onSubmit = (dataFormProductCategory: any) => {
    if (!isEditSession) {
      return createProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_type: selectCategoryType?.value || "",
          productCategory_image:
            dataFormProductCategory["productCategory_image"],
        },
        {
          onSuccess: (newData) => moveBack(),
        }
      );
    } else {
      console.log(dataFormProductCategory["productCategory_image"]);
      return updateProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_type: selectCategoryType?.value || "",
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
              {isWorking ? "Creating ...." : "Create category"}
            </Button>
          ) : (
            <Button disabled={isWorking}>
              {isWorking ? "Editing ...." : "Edit category"}
            </Button>
          )}
        </FormRow>
      </Form>
    </>
  );
}
