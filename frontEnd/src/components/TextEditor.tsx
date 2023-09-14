import JoditEditor from "jodit-react";
import { useState } from "react";

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
