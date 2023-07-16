import UseBrand from "./UseBrandApi";
import { useForm } from "react-hook-form";
import { BrandType } from "../../../featureTypes";
import { Button, FileInput, Form, FormRow, Input } from "../../../components";

interface IProps {
  brandToEdit?: BrandType;
  onCloseModal?: () => void;
}

const initializeFormBrand: BrandType = {
  _id: null,
  brand_image: null,
  brand_name: null,
  brand_origin: null,
};

export function BrandForm(props: IProps) {
  const { createBrand, isCreatingBrand } = UseBrand.useCreateBrand();
  const { updateBrand, isUpdatingBrand } = UseBrand.useUpdateBrand();

  const { _id: editId, ...editValue } =
    props.brandToEdit || initializeFormBrand;

  const isEditSession = Boolean(editId);

  const { handleSubmit, register, formState, reset, getValues } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors: errorsForm } = formState;

  const isWorking = isCreatingBrand || isUpdatingBrand;

  const onSubmit = (dataFormBrand: BrandType) => {
    // Create Brand
    if (!isEditSession) {
      return createBrand(
        { ...dataFormBrand, brand_image: dataFormBrand["brand_image"][0] },
        {
          onSuccess: (newBrand) => {
            console.log("newBrand::", newBrand);
            props.onCloseModal();
          },
        }
      );
    } else {
      return updateBrand(
        {
          ...dataFormBrand,
          brand_image: dataFormBrand["brand_image"][0],
          _id: editId,
        },
        {
          onSuccess: (brandUpdated) => {
            console.log("brandUpdated::", brandUpdated);
            props.onCloseModal();
          },
        }
      );
    }
  };

  const onError = (errors: any) => {
    console.error(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={props.onCloseModal && "modal"}
    >
      <FormRow label="Brand Name" error={errorsForm.brand_name}>
        <Input
          type="text"
          id="brandName"
          {...register("brand_name", {
            required: "Please provide brand name",
          })}
        />
      </FormRow>
      <FormRow label="Brand Origin" error={errorsForm.brand_origin}>
        <Input
          type="text"
          id="brandOrigin"
          {...register("brand_origin", {
            required: "Please provide brand origin",
          })}
        />
      </FormRow>
      <FormRow label="Brand Image" error={errorsForm.brand_image}>
        <FileInput
          id="imageBrand"
          name="brand_image"
          accept="image/*"
          {...register("brand_image", {
            required: "Please provide brand image",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={props.onCloseModal}
        >
          Cancel
        </Button>
        {!isEditSession ? (
          <Button disabled={isWorking}>
            {isWorking ? "Creating ...." : "Create brand"}
          </Button>
        ) : (
          <Button disabled={isWorking}>
            {isWorking ? "Editing ...." : "Edit brand"}
          </Button>
        )}
      </FormRow>
    </Form>
  );
}
