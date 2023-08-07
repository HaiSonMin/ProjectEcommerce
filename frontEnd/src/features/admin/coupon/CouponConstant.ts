import IOptionSelectBoolean from "@/helpers/ISelectOptionBoolean";
import IOptionSelect from "@/helpers/ISelectOption";

export const CouponOptionsType: Array<IOptionSelect> = [
  { value: "percentage", label: "Percentage(%)" },
  { value: "fixed_amount", label: "FixedAmount(unit)" },
];
export const CouponOptionAppliesAll: Array<IOptionSelectBoolean> = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

