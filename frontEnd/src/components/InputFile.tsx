// import styled from "styled-components";

// const InputFile = styled.input.attrs({ type: "file"})`
//   font-size: 1.4rem;
//   border-radius: 1rem;

//   &::file-selector-button {
//     font-weight: 500;
//     padding: 0.8rem 1.2rem;
//     margin-right: 1.2rem;
//     border-radius: 1rem;
//     border: none;
//     color: var(--color-brand-50);
//     background-color: var(--color-grey-500);
//     cursor: pointer;
//     transition:
//       color 0.2s,
//       background-color 0.2s;

//     &:hover {
//       background-color: var(--color-grey-600);
//     }
//   }
// `;

// export default InputFile;

import styled, { css } from "styled-components";
import { ImImage, ImImages } from "react-icons/im";
import { UseFormRegister } from "react-hook-form";

const InputFileStyled = styled.label<{ $isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  border-radius: 1rem;
  ${(props) =>
    !props.$isDisabled
      ? css`
          cursor: pointer;
        `
      : css`
          cursor: no-drop;
        `}
  transition: all 0.2s;

  & input {
    display: none;
  }
`;

const InputFile = styled.input.attrs({ type: "file" })`
  display: none; /* Hide the actual file input */
`;

const FileInputChose = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  margin-right: 1.2rem;
  border-radius: 1rem;
  border: none;
  color: var(--color-brand-50);
  background-color: var(--color-grey-500);

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const InfoSelect = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

interface IProps {
  onChange?: any;
  disabled?: boolean;
  id: string;
  multiple?: boolean;
  register?: any;
  numberImage?: number;
}

export default function CustomFileInput({
  onChange,
  disabled,
  multiple,
  id,
  register,
  numberImage,
}: IProps) {
  return (
    <InputFileStyled htmlFor={id} $isDisabled={disabled}>
      {!multiple ? (
        <FileInputChose>
          <span>Choose a file</span> <ImImage />
        </FileInputChose>
      ) : (
        <FileInputChose>
          <span>Choose files</span> <ImImages />
        </FileInputChose>
      )}
      {!numberImage ? (
        <InfoSelect>Chọn ảnh</InfoSelect>
      ) : (
        <InfoSelect>Bạn đã chọn {numberImage} ảnh</InfoSelect>
      )}
      {register ? (
        <InputFile
          {...register}
          disabled={disabled}
          multiple={multiple}
          accept="image/*"
          id={id}
        />
      ) : (
        <InputFile
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
          accept="image/*"
          id={id}
        />
      )}
    </InputFileStyled>
  );
}
