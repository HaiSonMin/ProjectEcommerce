import { useForm } from "react-hook-form";
import { ProductCategoryType } from "../../../featureTypes";
import UseProductCategoryApi from "./UseProductCategoryApi";
import { Button, FileInput, Form, FormRow, Input } from "../../../components";
interface IProps {
  editToProductCategory?: ProductCategoryType;
  onCloseModal?: () => void;
}

const initializeFormProductCategory: ProductCategoryType = {
  _id: null,
  productCategory_image: null,
  productCategory_name: null,
};

export default function ProductCategoryForm(props: IProps) {
  const { isCreatingProductCategory, createProductCategory } =
    UseProductCategoryApi.useCreateCategory();
  const { isUpdatingProductCategory, updateProductCategory } =
    UseProductCategoryApi.useUpdateCategory();
  const isWorking = isCreatingProductCategory || isUpdatingProductCategory;

  // Value for edit
  const { _id: editId, ...editValue } =
    props.editToProductCategory || initializeFormProductCategory;

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState, reset, getValues } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors: errorsForm } = formState;

  const onSubmit = (dataFormProductCategory: ProductCategoryType) => {
    if (!isEditSession) {
      return createProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_image:
            dataFormProductCategory["productCategory_image"][0],
        },
        {
          onSuccess: (newData) => {
            console.log("newData:::", newData);
            props.onCloseModal?.();
          },
        }
      );
    } else {
      return updateProductCategory(
        {
          ...dataFormProductCategory,
          productCategory_image:
            dataFormProductCategory["productCategory_image"][0],
          _id: editId,
        },
        {
          onSuccess: (newData) => {
            console.log(newData);
            props.onCloseModal?.();
          },
        }
      );
    }
  };
  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={props.onCloseModal && "modal"}
    >
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
      <FormRow
        label="Product Category Image"
        error={errorsForm.productCategory_image}
      >
        <FileInput
          id="productCategoryImage"
          name="productCategory_image"
          accept="image/*"
          {...register("productCategory_image", {
            required: "Please provide product category image",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          onClick={props.onCloseModal}
        >
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
  );
}
