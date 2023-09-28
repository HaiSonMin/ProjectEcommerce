import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import styled from "styled-components";

const Label = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const Content = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);
`;

const CollapseStyled = styled(Collapse)``;

interface IProps {
  items: Array<any>;
}

export default function Collapses({ items }: IProps) {
  const itemsRender: CollapseProps["items"] = items.map((item) => {
    return {
      key: item.id,
      label: <Label>{item.label}</Label>,
      children: <Content>{item.content}</Content>,
    };
  });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <CollapseStyled items={itemsRender} onChange={onChange} />;
}
