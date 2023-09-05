import { useForm } from "react-hook-form";
import { IDemand } from "@/interfaces";
import UseDemandApi from "./UseDemandApi";
import { Button, InputFile, Form, FormRow, Input, Heading } from "@/components";
import { useState } from "react";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/helpers/ISelectOption";
import { useMoveBack } from "@/hooks";
import UseProductCategoryApi from "../productCategory/UseProductCategoryApi";
interface IProps {
  demandEdit?: IDemand;
  onCloseModal?: () => void;
}

const initializeFormDemand: IDemand = {
  _id: "",
  demand_name: "",
  demand_image: "",
  demand_productCategory: "",
};

export default function DemandForm(props: IProps) {
  const moveBack = useMoveBack();

  const categoryType: Pick<IOptionSelect, "value"> = {
    value:
      typeof props.demandEdit?.demand_productCategory === "string"
        ? props.demandEdit?.demand_productCategory
        : props.demandEdit?.demand_productCategory._id || null,
  };

  const [selectCategoryType, setSelectCategoryType] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(categoryType);
  const { isCreatingDemand, createDemand } = UseDemandApi.createDemand();
  const { isUpdatingDemand, updateDemand } = UseDemandApi.updateDemand();
  const isWorking = isCreatingDemand || isUpdatingDemand;
  const { metadata: categories } = UseProductCategoryApi.getAllCategories(10e9);
  const optionSelectProductCategories: Array<IOptionSelect> | undefined =
    categories?.productCategories?.map((category) => {
      return {
        label: category.productCategory_name,
        value: category._id,
      };
    });

  console.log("metadata:::", optionSelectProductCategories);

  // Value for edit
  const { _id: editId, ...editValues } =
    props.demandEdit || initializeFormDemand;

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

  const onSubmit = (dataFormDemand: any) => {
    if (!isEditSession) {
      return createDemand(
        {
          ...dataFormDemand,
          demand_productCategory: selectCategoryType?.value || "",
          demand_image: dataFormDemand["demand_image"],
        },
        {
          onSuccess: (newData) => {
            console.log(newData);
            // moveBack();
          },
        }
      );
    } else {
      console.log({
        ...dataFormDemand,
        demand_productCategory: selectCategoryType?.value || "",
        demand_image: dataFormDemand["demand_image"] ?? editValues.demand_image,
        _id: editId,
      });
      return updateDemand(
        {
          ...dataFormDemand,
          demand_productCategory: selectCategoryType?.value || "",
          demand_image:
            dataFormDemand["demand_image"] ?? editValues.demand_image,
          _id: editId,
        },
        {
          onSuccess: (newData) => {
            console.log(newData);
            moveBack();
          },
        }
      );
    }
  };

  return (
    <>
      <Heading $as="h1">
        {isEditSession ? "Edit discount" : "Add new demand"}
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Demand Category" error={errorsForm}>
          <Select
            id="DemandType"
            placeholder={"Select an type"}
            value={selectCategoryType}
            onChange={handlerSelectCategoryType}
            options={optionSelectProductCategories}
          />
        </FormRow>
        <FormRow label="Demand Name" error={errorsForm.demand_name}>
          <Input
            type="text"
            id="DemandName"
            {...register("demand_name", {
              required: "Please provide demand name",
            })}
          />
        </FormRow>
        {!isEditSession ? (
          <FormRow label="Demand Image" error={errorsForm.demand_image}>
            <InputFile
              id="DemandImage"
              accept="image/*"
              {...register("demand_image", {
                required: "Please provide demand image",
              })}
            />
          </FormRow>
        ) : (
          <FormRow label="Demand Image">
            <InputFile
              id="DemandImage"
              accept="image/*"
              {...register("demand_image")}
            />
          </FormRow>
        )}
        <FormRow>
          <Button type="reset" $variation="secondary" onClick={moveBack}>
            Cancel
          </Button>
          {!isEditSession ? (
            <Button disabled={isWorking}>
              {isWorking ? "Creating...." : "Create demand"}
            </Button>
          ) : (
            <Button disabled={isWorking}>
              {isWorking ? "Editing...." : "Edit demand"}
            </Button>
          )}
        </FormRow>
      </Form>
    </>
  );
}
