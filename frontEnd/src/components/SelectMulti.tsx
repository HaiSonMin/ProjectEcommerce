import React from "react";
import { Select, Space, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import IOptionSelect from "@/helpers/ISelectOption";

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
  options: Array<IOptionSelect>;
  onChange: any;
  disabled?: boolean;
  defaultValues: Array<string>;
}

export default function SelectMulti(props: IProps) {
  return (
    <Select
      mode="multiple"
      disabled={props.disabled}
      showArrow
      tagRender={tagRender}
      className="w-full font-medium "
      options={props.options}
      onChange={props.onChange} 
      placeholder="Select categories"
      defaultValue={props.defaultValues}
    />
  );
}
