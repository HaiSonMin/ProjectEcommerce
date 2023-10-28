import React from "react";
import { Select, Tag, Space } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import IOptionSelect from "@/interfaces/shared/ISelectOption.interface";

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
      className="flex items-center gap-1 font-medium px-3 bg-amber-100"
    >
      {label}
    </Tag>
  );
};

interface IProps {
  id: string;
  options: Array<IOptionSelect> | undefined;
  onChange: any;
  disabled?: boolean;
  placeholder: string;
  defaultValues: Array<string> | undefined;
}

export default function SelectMulti(props: IProps) {
  return (
    <Space direction="vertical">
      <Select
        mode="multiple"
        disabled={props.disabled}
        // tagRender={tagRender}
        className="w-full font-medium "
        options={props.options}
        onChange={props.onChange}
        placeholder={props.placeholder}
        defaultValue={props.defaultValues}
      />
    </Space>
  );
}
