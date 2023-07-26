import IOptionSelect from "@/helpers/ISelectOption";

const DiscountOptionsType: Array<IOptionSelect> = [
  { value: "percentage", label: "Percentage(%)" },
  { value: "fixed_amount", label: "FixedAmount(unit)" },
];

export default DiscountOptionsType;
