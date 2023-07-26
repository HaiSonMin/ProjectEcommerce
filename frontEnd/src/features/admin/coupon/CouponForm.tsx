import {
  Button,
  Form,
  FormRow,
  Heading,
  Input,
  SelectDate,
} from "@/components";
import Select, { SingleValue } from "react-select";
import { ICoupon } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMoveBack } from "@/hooks";
import IOptionSelect from "@/helpers/ISelectOption";
import UseCouponApi from "./UseCouponApi";
import CouponOptionsType from "./CouponConstant";

interface IProps {
  couponEdit?: ICoupon;
}

export default function CouponFrom(props: IProps) {
  const moveBack = useMoveBack();
  const isEditSession = Boolean(props.couponEdit?._id);
  const [selectType, setSelectType] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  const { isCreatingCoupon, createCoupon } = UseCouponApi.createCoupon();
  const { isUpdatingCoupon, updateCoupon } = UseCouponApi.updateCoupon();

  const isWorking = isCreatingCoupon || isUpdatingCoupon;

  const { register, formState, control, handleSubmit, getValues } = useForm({
    defaultValues: props.couponEdit ? props.couponEdit : {},
  });

  const { errors: errorsForm } = formState;

  const onSubmit = (dataForm: Omit<ICoupon, "_id" | "Coupon_productIds">) => {
    if (!isEditSession) {
      const dataCreate: Omit<ICoupon, "_id"> = {
        coupon_name: dataForm.coupon_name,
        coupon_code: dataForm.coupon_code,
        coupon_type: selectType?.value || "",
        coupon_value: dataForm.coupon_value,
        coupon_applicableProducts: [],
        coupon_applicableProductCategories: [],
        coupon_minimumOrderValue: dataForm.coupon_minimumOrderValue,
        coupon_startDate: dataForm.coupon_startDate,
        coupon_endDate: dataForm.coupon_endDate,
      };
      createCoupon(dataCreate, { onSuccess: () => moveBack() });
    } else {
      const dataEdit: Partial<ICoupon> = {
        _id: props.couponEdit?._id,
        coupon_name: dataForm.coupon_name,
        coupon_code: dataForm.coupon_code,
        coupon_type: selectType?.value || "",
        coupon_value: dataForm.coupon_value,
        coupon_startDate: dataForm.coupon_startDate,
        coupon_endDate: dataForm.coupon_endDate,
        coupon_applicableProducts: [],
        coupon_applicableProductCategories: [],
      };
      updateCoupon(dataEdit, { onSuccess: () => moveBack() });
    }
  };

  const handlerSelectType = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectType(option);
  };

  return (
    <>
      {}
      <Heading $as="h1">
        {isEditSession ? "Edit Coupon" : "Add new Coupon"}
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Coupon Name" error={errorsForm.coupon_name}>
          <Input
            id="CouponName"
            type="text"
            placeholder="Coupon Name"
            {...register("coupon_name", {
              required: "Please provide Coupon name",
            })}
          />
        </FormRow>
        <FormRow label="Coupon Type" error={errorsForm.coupon_type}>
          <Select
            id="CouponType"
            placeholder={"Please Select Type"}
            value={selectType}
            onChange={handlerSelectType}
            options={CouponOptionsType}
          />
        </FormRow>
        <FormRow label="Coupon Code" error={errorsForm.coupon_code}>
          <Input
            id="CouponCode"
            type="text"
            placeholder="Coupon Code"
            {...register("coupon_code", {
              required: "Please provide Coupon name",
            })}
          />
        </FormRow>
        <FormRow
          label={`Coupon Value(${
            selectType?.value === "percentage" ? "%" : "$"
          })`}
          error={errorsForm.coupon_value}
        >
          <Input
            id="CouponValue"
            type="number"
            placeholder="value Coupon"
            {...register("coupon_value", {
              required: "Please provide Coupon value",
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
        <FormRow label="Coupon Start Date" error={errorsForm.coupon_startDate}>
          <SelectDate
            control={control}
            id="CouponStartDate"
            name="coupon_startDate"
            placeholder="Select start date"
            rules="Please provide start date"
          />
        </FormRow>
        <FormRow label="Coupon End Date" error={errorsForm.coupon_endDate}>
          <SelectDate
            control={control}
            id="CouponEndDate"
            name="coupon_endDate"
            placeholder="Select end date"
            rules="Please provide end date"
            validate={(value: any) => {
              if (value < getValues().coupon_startDate)
                return "End date must be getter than start date";
            }}
          />
        </FormRow>
        <FormRow>
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          {!isEditSession ? (
            <Button disabled={isWorking}>
              {isWorking ? "Creating ...." : "Create Coupon"}
            </Button>
          ) : (
            <Button disabled={isWorking}>
              {isWorking ? "Editing ...." : "Edit Coupon"}
            </Button>
          )}
        </FormRow>
      </Form>
    </>
  );
}
