import {
  Input,
  FormRow,
  Heading,
  FormBox,
  InputFile,
  FromHeading,
} from "@/components";
import JoditEditor from "jodit-react";
import { useState, useMemo } from "react";
import { styled } from "styled-components";
import CONSTANT from "@/constant/value-constant";
import IOptionSelect from "@/helpers/ISelectOption";
import Select, { SingleValue } from "react-select";

const SpecificationPhoneStyled = styled.div``;

export default function SpecificationPhone({ register, errorsForm }) {
  const [selectRom, setSelectRom] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);
  const [selectRam, setSelectRam] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(null);

  const handlerSelectRam = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectRam(option);
  };
  const handlerSelectRom = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectRom(option);
  };

  const optionsRam: Array<IOptionSelect> = useMemo(() => {
    return Object.keys(CONSTANT.RAM).map((item) => {
      return { value: item, label: item };
    });
  }, []);

  const optionsRom: Array<IOptionSelect> = useMemo(() => {
    return Object.keys(CONSTANT.ROM).map((item) => {
      return { value: item, label: item };
    });
  }, []);
  return (
    <SpecificationPhoneStyled>
      <FromHeading>
        <Heading $as="h2">Specification Phone</Heading>
      </FromHeading>
      <FormBox>
        <FormRow label="Product RAM" error={errorsForm.product_mainInfo}>
          <Select
            id="productRam"
            placeholder={"Select an RAM"}
            value={selectRam}
            onChange={handlerSelectRam}
            options={optionsRam}
          />
        </FormRow>
        <FormRow label="Product ROM" error={errorsForm.product_mainInfo}>
          <Select
            id="productRom"
            placeholder={"Select an ROM"}
            value={selectRom}
            onChange={handlerSelectRom}
            options={optionsRom}
          />
        </FormRow>
      </FormBox>
    </SpecificationPhoneStyled>
  );
}
