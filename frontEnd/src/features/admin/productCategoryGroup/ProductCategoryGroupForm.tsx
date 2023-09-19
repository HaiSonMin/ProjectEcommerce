import { useMoveBack } from "@/hooks";
import { useForm } from "react-hook-form";
import { IProductCategoryGroup } from "@/interfaces";
import { UseProductCategoryGroupApi } from "@/apis-use";
import { Button, InputFile, Form, FormRow, Input, Heading } from "@/components";
interface IProps {
  productCategoryGroupEdit?: IProductCategoryGroup;
  onCloseModal?: () => void;
}

const initializeFormProductCategory: IProductCategoryGroup = {
  _id: "",
  productCategoryGroup_name: "",
  productCategoryGroup_image: "",
};

export default function ProductCategoryForm(props: IProps) {
  const moveBack = useMoveBack();

  const { isCreatingProductCategoryGroup, createProductCategoryGroup } =
    UseProductCategoryGroupApi.createCategoryGroup();
  const { isUpdatingProductCategoryGroup, updateProductCategoryGroup } =
    UseProductCategoryGroupApi.updateCategoryGroup();

  const isWorking =
    isCreatingProductCategoryGroup || isUpdatingProductCategoryGroup;

  // Value for edit
  const { _id: editId, ...editValues } =
    props.productCategoryGroupEdit ?? initializeFormProductCategory;

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors: errorsForm } = formState;

  const onSubmit = (dataFormProductCategoryGroup: any) => {
    if (!isEditSession) {
      return createProductCategoryGroup(
        {
          ...dataFormProductCategoryGroup,
          productCategoryGroup_image:
            dataFormProductCategoryGroup["productCategoryGroup_image"],
        },
        {
          onSuccess: (newData) => moveBack(),
        }
      );
    } else {
      return updateProductCategoryGroup(
        {
          ...dataFormProductCategoryGroup,
          productCategoryGroup_image:
            dataFormProductCategoryGroup["productCategoryGroup_image"] ??
            editValues.productCategoryGroup_image,
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
        <FormRow
          label="Product Category Name"
          error={errorsForm.productCategoryGroup_name}
        >
          <Input
            type="text"
            id="productCategoryName"
            {...register("productCategoryGroup_name", {
              required: "Please provide product category name",
            })}
          />
        </FormRow>
        {!isEditSession ? (
          <FormRow
            label="Product Category Image"
            error={errorsForm.productCategoryGroup_image}
          >
            <InputFile
              id="productCategoryImage"
              register={register("productCategoryGroup_image", {
                required: "Please provide product category image",
              })}
            />
          </FormRow>
        ) : (
          <FormRow label="Product Category Image">
            <InputFile
              id="productCategoryImage"
              register={register("productCategoryGroup_image")}
            />
          </FormRow>
        )}
        <FormRow>
          <Button type="reset" $variation="secondary" onClick={moveBack}>
            Cancel
          </Button>
          {!isEditSession ? (
            <Button disabled={isWorking}>
              {isWorking ? "Creating...." : "Create category group"}
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
