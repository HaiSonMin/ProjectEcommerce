import { useState } from "react";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";
import IOptionSelect from "@/helpers/ISelectOption";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const SelectMultiTest: React.FC = () => {
  const [optionsAbc, setOptionsAbc] = useState<Array<string>>([]);

  const optionSelect: Array<IOptionSelect> = options.map?.((option: any) => {
    return { label: option.label, value: option.value };
  });

  const handleChange = (value: Array<string>) => {
    setOptionsAbc(value);
  };

  console.log(optionsAbc);
  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={["a10", "c12"]}
        onChange={handleChange}
        options={optionSelect}
      />
    </Space>
  );
};

export default SelectMultiTest;
