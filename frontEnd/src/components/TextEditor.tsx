import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  handlerChangeText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextEditor(props: IProps) {
  const [content, setContent] = useState("");

  console.log(content);

  return (
    <JoditEditor
      value={content}
      onChange={(newContext) => setContent(newContext)}
    />
  );
}
