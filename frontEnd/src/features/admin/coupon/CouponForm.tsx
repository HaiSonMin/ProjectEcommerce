import {
  Button,
  Form,
  FormRow,
  Heading,
  Input,
  SelectDate,
  SelectMulti,
} from "@/components/shared";
import { useMoveBack } from "@/hooks";
import { ICoupon } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/helpers/ISelectOption";
import IOptionSelectBoolean from "@/helpers/ISelectOptionBoolean";
import { UseCouponApi, UseProductCategoryApi } from "@/apis-use";
import { CouponOptionAppliesAll, CouponOptionsType } from "./CouponConstant";

interface IProps {
  couponEdit?: ICoupon;
}

export default function CouponFrom(props: IProps) {
  const moveBack = useMoveBack();
  const isEditSession = Boolean(props.couponEdit?._id);

  const [selectType, setSelectType] = useState<
    SingleValue<Pick<IOptionSelect, "value">>
  >(function () {
    const defaultSelectType: Pick<IOptionSelect, "value"> = {
      value: props.couponEdit?.coupon_type || null,
    };
    return defaultSelectType;
  });

  const [selectAppliesAll, setSelectAppliesAll] = useState<
    SingleValue<Pick<IOptionSelectBoolean, "value">>
  >(function () {
    const defaultApplyAll: Pick<IOptionSelectBoolean, "value"> = {
      value: props.couponEdit?.coupon_appliesAll || false,
    };
    return defaultApplyAll;
  });
  const [selectAppliesCategories, setSelectAppliesCategories] = useState<
    Array<string>
  >(props.couponEdit?.coupon_applicableProductCategories || []);

  const { isCreatingCoupon, createCoupon } = UseCouponApi.createCoupon();
  const { isUpdatingCoupon, updateCoupon } = UseCouponApi.updateCoupon();

  const isWorking = isCreatingCoupon || isUpdatingCoupon;

  const { register, formState, control, handleSubmit, getValues } = useForm({
    defaultValues: props.couponEdit ? props.couponEdit : {},
  });

  const { errors: errorsForm } = formState;

  const { metadata: categoryInfo } = UseProductCategoryApi.getAllCategories();
  const optionsCategory: Array<IOptionSelect> | undefined = useMemo(() => {
    return categoryInfo?.productCategories.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  }, []);

  const onSubmit = (dataForm: Omit<ICoupon, "_id" | "Coupon_productIds">) => {
    if (!isEditSession) {
      const dataCreate: Omit<ICoupon, "_id"> = {
        coupon_name: dataForm.coupon_name,
        coupon_code: dataForm.coupon_code,
        coupon_type: selectType?.value || "",
        coupon_value: dataForm.coupon_value,
        coupon_applicableProducts: [],
        coupon_appliesAll: selectAppliesAll?.value || false,
        coupon_applicableProductCategories: selectAppliesAll?.value
          ? []
          : selectAppliesCategories,
        coupon_minimumOrderValue: dataForm.coupon_minimumOrderValue,
        coupon_numberOfApplication: dataForm.coupon_numberOfApplication,
        coupon_startDate: dataForm.coupon_startDate,
        coupon_endDate: dataForm.coupon_endDate,
      };
      createCoupon(dataCreate, {
        onSuccess: (newCoupon) => {
          console.log(newCoupon);
          moveBack();
        },
      });
      // console.log(dataCreate);
    } else {
      const dataEdit: Partial<ICoupon> = {
        _id: props.couponEdit?._id,
        coupon_name: dataForm.coupon_name,
        coupon_code: dataForm.coupon_code,
        coupon_type: selectType?.value || "",
        coupon_value: dataForm.coupon_value,
        coupon_applicableProducts: [],
        coupon_appliesAll: selectAppliesAll?.value || false,
        coupon_applicableProductCategories: selectAppliesAll?.value
          ? []
          : selectAppliesCategories,
        coupon_minimumOrderValue: dataForm.coupon_minimumOrderValue,
        coupon_numberOfApplication: dataForm.coupon_numberOfApplication,
        coupon_startDate: dataForm.coupon_startDate,
        coupon_endDate: dataForm.coupon_endDate,
      };
      // console.log(dataEdit);
      updateCoupon(dataEdit, {
        onSuccess: (couponEdited) => {
          console.log(couponEdited.metadata);
          moveBack();
        },
      });
    }
  };

  const handlerSelectType = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectType(option);
  };

  const handlerSelectAppliesAll = (
    option: SingleValue<Pick<IOptionSelectBoolean, "value">>
  ) => {
    setSelectAppliesAll(option);
  };

  const handlerSelectCategories = (values: Array<string>) => {
    setSelectAppliesCategories(values);
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
            id="couponName"
            type="text"
            placeholder="Coupon name"
            {...register("coupon_name", {
              required: "Please provide Coupon name",
            })}
          />
        </FormRow>
        <FormRow label="Coupon Type" error={errorsForm.coupon_type}>
          <Select
            id="couponType"
            placeholder={"Please select type"}
            value={selectType}
            onChange={handlerSelectType}
            options={CouponOptionsType}
            className="font-medium text-zinc-500"
          />
        </FormRow>
        <FormRow label="Coupon Code" error={errorsForm.coupon_code}>
          <Input
            id="couponCode"
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
            id="couponValue"
            type="number"
            placeholder="Value coupon"
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
        <FormRow
          label={`Coupon minimum order($)`}
          error={errorsForm.coupon_minimumOrderValue}
        >
          <Input
            id="couponMinimumOrderValue"
            type="number"
            placeholder="Value Minimum Order"
            {...register("coupon_minimumOrderValue", {
              required: "Please provide Coupon value",
              min: {
                value: 1,
                message: "Value must be getter than 1",
              },
              validate: (value: number) => {
                if (
                  selectType?.value === "fixed_amount" &&
                  value < getValues().coupon_value
                )
                  return `Value must be getter than equal ${
                    getValues().coupon_value
                  }`;
              },
            })}
          />
        </FormRow>
        <FormRow label="Coupon Applies All" error={errorsForm.coupon_type}>
          <Select
            id="couponAppliesAll"
            placeholder={"You want applies all products?"}
            value={selectAppliesAll}
            onChange={handlerSelectAppliesAll}
            options={CouponOptionAppliesAll}
            className="font-medium text-zinc-500"
          />
        </FormRow>
        <FormRow label="Coupon Categories">
          <SelectMulti
            id="selectMulti"
            disabled={selectAppliesAll?.value || false}
            options={optionsCategory || []}
            onChange={handlerSelectCategories}
            placeholder="Select categories"
            defaultValues={
              props.couponEdit?.coupon_applicableProductCategories || []
            }
          />
        </FormRow>
        <FormRow
          label={`Coupon number of application($)`}
          error={errorsForm.coupon_numberOfApplication}
        >
          <Input
            id="couponNumberOfApplication"
            type="number"
            placeholder="Number of application?"
            {...register("coupon_numberOfApplication", {
              required: "Please provide number of application",
              min: {
                value: 1,
                message: "Value must be getter than 1",
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
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => moveBack()}
          >
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
