import {
  Button,
  Form,
  FormRow,
  Heading,
  Input,
  SelectDate,
} from "@/components/shared";
import { useState } from "react";
import { useMoveBack } from "@/hooks";
import { IDiscount } from "@/interfaces";
import { useForm } from "react-hook-form";
import { UseDiscountApi } from "@/apis-use";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/helpers/ISelectOption";
import DiscountOptionsType from "./DiscountConstant";

interface IProps {
  discountEdit?: IDiscount;
  onCloseModal?: () => void;
}

export default function DiscountFrom(props: IProps) {
  const moveBack = useMoveBack();
  const isEditSession = Boolean(props.discountEdit?._id);
  const [selectType, setSelectType] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  const { isCreatingDiscount, createDiscount } =
    UseDiscountApi.createDiscount();
  const { isUpdatingDiscount, updateDiscount } =
    UseDiscountApi.updateDiscount();

  const isWorking = isCreatingDiscount || isUpdatingDiscount;

  const { register, formState, control, handleSubmit, getValues } = useForm({
    defaultValues: props.discountEdit ? props.discountEdit : {},
  });

  const { errors: errorsForm } = formState;

  const onSubmit = (
    dataForm: Omit<IDiscount, "_id" | "discount_productIds">
  ) => {
    if (!isEditSession) {
      const dataCreate: Omit<IDiscount, "_id" | "discount_productIds"> = {
        discount_name: dataForm.discount_name,
        discount_code: dataForm.discount_code,
        discount_type: selectType?.value || "",
        discount_value: dataForm.discount_value,
        discount_startDate: dataForm.discount_startDate,
        discount_endDate: dataForm.discount_endDate,
      };
      createDiscount(dataCreate, { onSuccess: () => moveBack() });
    } else {
      const dataEdit: Partial<IDiscount> = {
        _id: props.discountEdit?._id,
        discount_name: dataForm.discount_name,
        discount_code: dataForm.discount_code,
        discount_type: selectType?.value || "",
        discount_value: dataForm.discount_value,
        discount_startDate: dataForm.discount_startDate,
        discount_endDate: dataForm.discount_endDate,
      };
      updateDiscount(dataEdit, { onSuccess: () => moveBack() });
    }
  };

  const handlerSelectType = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    console.log(option);
    setSelectType(option);
  };

  return (
    <>
      {}
      <Heading $as="h1">
        {isEditSession ? "Edit discount" : "Add new discount"}
      </Heading>
      <Form
        $type={props.onCloseModal && "modal"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormRow label="Discount Name" error={errorsForm.discount_name}>
          <Input
            id="discountName"
            type="text"
            placeholder="Discount Name"
            {...register("discount_name", {
              required: "Please provide discount name",
            })}
          />
        </FormRow>
        <FormRow label="Discount Type" error={errorsForm.discount_type}>
          <Select
            id="discountType"
            placeholder={"Please Select Type"}
            onChange={handlerSelectType}
            value={selectType}
            options={DiscountOptionsType}
          />
        </FormRow>
        <FormRow
          label={`Discount Value(${
            selectType?.value === "percentage" ? "%" : "$"
          })`}
          error={errorsForm.discount_value}
        >
          <Input
            id="discountValue"
            type="number"
            placeholder="value discount"
            {...register("discount_value", {
              required: "Please provide discount value",
              min: {
                value: 1,
                message: "Value must be getter than 1",
              },
              validate: (value: number) => {
                if (selectType?.value === "percentage" && value > 100)
                  return "Value must be less than equal 100";
              },
            })}
          />
        </FormRow>
        <FormRow label="Discount Code" error={errorsForm.discount_code}>
          <Input
            id="discountCode"
            type="text"
            placeholder="Discount Code"
            {...register("discount_code", {
              required: "Please provide discount name",
            })}
          />
        </FormRow>
        <FormRow
          label="Discount Start Date"
          error={errorsForm.discount_startDate}
        >
          <SelectDate
            control={control}
            id="discountStartDate"
            name="discount_startDate"
            placeholder="Select start date"
            rules="Please provide start date"
          />
        </FormRow>
        <FormRow label="Discount End Date" error={errorsForm.discount_endDate}>
          <SelectDate
            control={control}
            id="discountEndDate"
            name="discount_endDate"
            placeholder="Select end date"
            rules="Please provide end date"
            validate={(value: any) => {
              if (value < getValues().discount_startDate)
                return "End date must be getter than start date";
            }}
          />
        </FormRow>
        <FormRow>
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => moveBack()}
          >
            Cancel
          </Button>
          {!isEditSession ? (
            <Button disabled={isWorking}>
              {isWorking ? "Creating ...." : "Create Discount"}
            </Button>
          ) : (
            <Button disabled={isWorking}>
              {isWorking ? "Editing ...." : "Edit Discount"}
            </Button>
          )}
        </FormRow>
      </Form>
    </>
  );
}
