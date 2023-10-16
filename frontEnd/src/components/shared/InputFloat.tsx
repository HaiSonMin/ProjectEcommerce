import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import EditItem from "./InputEdit";
const LoginBox = styled.div`
  text-align: center;
  margin: 0 20%;
  font-family: "Times New Roman", Times, serif;
`;

export default function InputFloat() {
  const [DataForm, setDataForm] = useState([
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
  const [InputData, setInputData] = useState<string>("");


  return (
        <LoginBox>
           
            <Button>Cập Nhật Thông Tin</Button>
        </LoginBox>
      );
    }
    
    // <LoginBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Họ và tên: {DataForm[0]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Giới tính: {DataForm[1]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Số điện thoại: {DataForm[2]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Sinh nhật: {DataForm[3]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Ngày tham gia Smember: {DataForm[4]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Tổng tiền tích lũy từ 01/01/2022: {DataForm[5]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Tổng tiền đã mua sắm: {DataForm[6]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Địa chỉ: {DataForm[7]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <UserBox>
    //     <InputField
    //       type="text"
    //       name=""
    //       required
    //       value=""
    //       onChange={(e) => setInputData(e.target.value)}
    //     />
    //     <Label>Đổi mật khẩu: {DataForm[8]}</Label>
    //     <IconEdit/>
    //   </UserBox>
    //   <Button>Cập Nhật Thông Tin</Button>
    // </LoginBox>