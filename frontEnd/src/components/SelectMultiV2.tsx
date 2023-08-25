import React from "react";
import { Select, Tag, Space } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import IOptionSelect from "@/helpers/ISelectOption";
import { styled } from "styled-components";
import { DefaultOptionType } from "antd/es/select";

const { Option } = Select;

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

const LabelOption = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  & img {
    display: block;
    height: 2rem;
    object-fit: contain;
    background-color: transparent;
  }
`;

interface IProps {
  id: string;
  options: Array<DefaultOptionType> | undefined;
  onChange: any;
  disabled?: boolean;
  placeholder: string;
  defaultValues: Array<string> | undefined;
}

export default function SelectMultiV2(props: IProps) {
  return (
    <Select
      mode="multiple"
      disabled={props.disabled}
      tagRender={tagRender}
      onChange={props.onChange}
      placeholder={props.placeholder}
      defaultValue={props.defaultValues}
      optionLabelProp="label"
    >
      {props.options?.map((option) => (
        <Option key={option.value} value={option.value} label={option.label}>
          <Space>
            <LabelOption>
              <span aria-label={option.label as string}>{option.label}</span>
              <img role="img" src={option.image} alt={`Icon ${option.label}`} />
            </LabelOption>
          </Space>
        </Option>
      ))}
    </Select>
  );
}
