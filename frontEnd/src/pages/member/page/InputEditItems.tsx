import { Button } from "@/components";
import EditItem from "@/components/InputEdit";
import React, { useState } from "react";
import styled from "styled-components";

const LoginBox = styled.div`
  text-align: center;
  margin: 0 20%;
  font-family: "Times New Roman", Times, serif;
`;


    
 



const ItemList: React.FC = () => {
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2"]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [DataForm, setDataForm] = useState([
    "Họ và tên ",
    "Giới tính",
    "Số điện thoại",
    "Sinh nhật",
    ">Ngày tham gia Smember",
    "Tổng tiền tích lũy từ 01/01/2022",
    "Tổng tiền đã mua sắm",
    "Địa chỉ",
    "Đổi mật khẩu",
  ]);
  const [InputData, setInputData] = useState([
    "Lê Thịnh Vượng ",
    "Chưa cập nhật",
    "0359874471",
    "02/01/2000",
    "15/2/2023",
    "0đ",
    "0đ",
    "Chưa có địa chỉ mặc định",
    "Đổi mật khẩu",
  ]);
  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleUpdate = (newItem: string) => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <LoginBox>
              <EditItem
                  NameInput= {InputData[index]}
                  defaultData = {DataForm[index]}
                  item={item}
                    onUpdate={handleUpdate}
                    onCancel={handleCancel}
              />
              <Button>Cập Nhật Thông Tin</Button>
          </LoginBox>
            ) : (
              <>
                {item}{" "}
                <span onClick={() => handleEdit(index)}>[Edit]</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
