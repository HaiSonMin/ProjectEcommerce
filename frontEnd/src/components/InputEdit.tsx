import React, { useState } from "react";
import styled from "styled-components";
import {FiEdit} from "react-icons/fi"


const UserBox = styled.div`
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: Black;
  margin-bottom: 2rem;
  border: none;
  border-bottom: 0.5px solid #d8c6c6;
  outline: none;
  background: transparent;
  font-weight: 100;
  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    left: 0;
    color: red;
    font-size: 16px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #837c7c;
  pointer-events: none;
  transition: 0.5s;
  outline: none;
  margin-left: 1rem;
  font-weight: 100;
`;
const IconEdit = styled(FiEdit)`
    position: absolute;
    top: 15px;
    right:10px;
`



interface EditItemProps {
  item: string;
  onUpdate: (newItem: string) => void;
  onCancel: () => void;
  defaultData:string;
  NameInput:string
}

const EditItem: React.FC<EditItemProps> = ({ item, onUpdate, onCancel, defaultData, NameInput }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleUpdate = () => {
    onUpdate(editedItem);
    onCancel();
  };

  return (
    <UserBox>
      <InputField
        type="text"
        name=""
        required
        value={editedItem}
        onChange={(e) => setEditedItem(e.target.value)}
      />
      <Label>{NameInput}: {defaultData}</Label>
      <IconEdit onClick={handleUpdate}/>
    </UserBox>
  );
};

export default EditItem;
