import { useRef, useState, useEffect, ReactHTML } from "react";
import { css, styled } from "styled-components";

const TextAreaLabelStyled = styled.div`
  position: relative;
  width: 100%;
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
const TextAreaStyled = styled.textarea<{ $haveValue: boolean }>`
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  &:focus {
    outline: 2px solid var(--color-primary);
  }
`;

interface IProps {
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
export default function TextAreaLabel({
  value,
  onChange,
  placeHolder,
}: IProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
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
    <TextAreaLabelStyled>
      <Label onClick={(e: any) => handleClickInput(e)} $isFocus={isFocus}>
        {placeHolder}
      </Label>
      <TextAreaStyled
        $haveValue={!!value}
        onClick={(e: any) => handleClickInput(e)}
        ref={ref}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
        value={value}
      />
    </TextAreaLabelStyled>
  );
}
