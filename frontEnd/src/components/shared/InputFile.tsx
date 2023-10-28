import styled, { css } from "styled-components";
import { BiCloudUpload } from "react-icons/bi";

const InputFilesStyled = styled.label<{ $isDisabled?: boolean }>`
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

const Input = styled.input.attrs({ type: "file" })`
  display: none; /* Hide the actual file input */
`;

const FileInputChose = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  font-weight: 500;
  padding: 0.6rem 1.2rem;
  margin-right: 1.2rem;
  border-radius: 1rem;
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);

  span {
    color: var(--color-blue-900) !important;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-blue-900) !important;
  }
`;

interface IProps {
  onChange?: any;
  disabled?: boolean;
  id: string;
  multiple?: boolean;
  register?: any;
}

export default function InputFile({
  onChange,
  disabled,
  multiple,
  id,
  register,
}: IProps) {
  return (
    <InputFilesStyled htmlFor={id} $isDisabled={disabled}>
      <FileInputChose>
        <span>Chọn files</span> <BiCloudUpload />
      </FileInputChose>

      {register ? (
        <Input
          {...register}
          disabled={disabled}
          multiple={multiple}
          accept="image/*"
          id={id}
        />
      ) : (
        <Input
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
          accept="image/*"
          id={id}
        />
      )}
    </InputFilesStyled>
  );
}
