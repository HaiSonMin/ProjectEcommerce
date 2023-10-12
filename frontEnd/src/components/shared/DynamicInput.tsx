import { useState } from "react";
import { styled } from "styled-components";

const DynamicInputStyled = styled.div``;

export default function DynamicInput() {
  const [inputs, setInputs] = useState<Array<any>>([]);
  const handlerChange = (event: any, index: number) => {
    const inputData = [...inputs];
    inputData[index] = event.target.value;
    setInputs(inputData);
  };
  const handlerAddInput = () => {
    const newInputs = [...inputs, [""]];
    setInputs(newInputs);
  };
  const handlerDeleteInput = (index) => {
    const newInputsDeleted = [...inputs];
    newInputsDeleted.splice(index);
    setInputs(newInputsDeleted);
  };
  return (
    <DynamicInputStyled>
      <button onClick={handlerAddInput}> Add new input</button>
      {inputs.map((_, index) => (
        <div>
          <input onChange={(e) => handlerChange(e, index)} />
          <button onClick={() => handlerDeleteInput(index)}>Delete</button>
        </div>
      ))}
    </DynamicInputStyled>
  );
}
