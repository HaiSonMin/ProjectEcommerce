import { useState } from "react";
import { Select, Space, Tag } from "antd";
import type { SelectProps } from "antd";
import IOptionSelect from "@/helpers/ISelectOption";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { UseBrandApi } from "@/features/admin/brand";
import { DefaultOptionType } from "antd/es/select";

const options: SelectProps["options"] = [];

const { Option } = Select;

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const tagRender = (props: CustomTagProps) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className="flex items-center gap-[2px] my-1 font-medium px-3 bg-amber-100"
    >
      {label}
    </Tag>
  );
};

const SelectMultiTestV2: React.FC = () => {
  const [optionsAbc, setOptionsAbc] = useState<Array<string>>([]);
  const { isGettingBrands, metadata: dataBrands } = UseBrandApi.getAllBrand();

  const optionSelectBrands: SelectProps["options"] = (
    dataBrands?.brands as Array<DefaultOptionType> | undefined
  )?.map?.((brand) => {
    return {
      label: brand.brand_name,
      value: brand.brand_name,
      id: brand.brand_name,
      image: "hahaha",
    };
  });

  console.log("options:::", options);
  console.log("optionSelectBrands:::", optionSelectBrands);

  const optionSelect: Array<DefaultOptionType> = options.map?.(
    (option: any) => {
      return { label: option.label, value: option.value };
    }
  );

  const handleChange = (value: Array<string>) => {
    setOptionsAbc(value);
  };

  console.log(optionsAbc);
  return (
    <Select
      mode="multiple"
      tagRender={tagRender}
      style={{ width: "100%" }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      optionLabelProp="label"
    >
      {optionSelectBrands?.map((option) => (
        <Option key={option.value}>
          <Space>
            <span>{option.label}</span>
          </Space>
        </Option>
      ))}
    </Select>
  );
};

export default SelectMultiTestV2;
