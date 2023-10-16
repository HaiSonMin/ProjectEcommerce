import { useRef, useState, useEffect } from "react";
import { css, styled } from "styled-components";

const InputLabelStyled = styled.div`
  position: relative;
  align-self: flex-start;
`;

const Label = styled.label<{ $isFocus: boolean }>`
  position: absolute;
  padding: 1px 2px;
  font-size: ${(props) => props.$isFocus && "1.2rem"};
  top: ${(props) => (props.$isFocus ? "-1rem" : "0.7rem")};
  left: ${(props) => (props.$isFocus ? "0.7rem" : "1.2rem")};
  background-color: ${(props) => (props.$isFocus ? "white" : "none")};
  color: ${(props) =>
    props.$isFocus ? "var(--color-primary)" : "var(--color-grey-400)"};
  font-weight: 500;
  transition: all 0.2s;
  cursor: auto;
`;
const InputStyled = styled.input`
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
  &:focus {
    outline: 2px solid var(--color-primary);
  }
`;

interface IProps {
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
}
export default function InputLabel({
  type,
  value,
  onChange,
  placeHolder,
}: IProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleClickInput = (e: MouseEvent) => {
    e.stopPropagation();
    if (ref.current) {
      ref.current.focus();
      setIsFocus(true);
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node) && !value) setIsFocus(false);
  };

  useEffect(() => {
    if (value) setIsFocus(true);
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [value]);

  return (
    <InputLabelStyled>
      <Label onClick={(e: any) => handleClickInput(e)} $isFocus={isFocus}>
        {placeHolder}
      </Label>
      <InputStyled
        onClick={(e: any) => handleClickInput(e)}
        ref={ref}
        value={value}
        type={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
    </InputLabelStyled>
  );
}
