import { useState } from "react";
import styled from "styled-components";
import { Input, Heading, TextArea, InputChecked } from "@/components/shared";

const CustomerInfoStyled = styled.div`
  .box__input--info {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  .box__text--area {
    margin-top: 1rem;
  }
`;

const BoxSex = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

enum ESex {
  male = "nam",
  female = "nu",
}

export default function CustomerInfo({ register, watch, errorsForm }) {
  const [choseSex, setChoseSex] = useState<string>(ESex.male);

  const handlerChoseSex = (sex: string) => {
    setChoseSex(sex);
  };

  return (
    <CustomerInfoStyled>
      <Heading $as="h4">Thông tin khách hàng</Heading>
      <BoxSex>
        <div onClick={() => handlerChoseSex(ESex.male)}>
          <InputChecked isChose={choseSex === ESex.male} label="Anh" />
        </div>
        <div onClick={() => handlerChoseSex(ESex.female)}>
          <InputChecked isChose={choseSex === ESex.female} label="Chị" />
        </div>
      </BoxSex>
      <div className="box__input--info">
        <Input placeholder="Họ và tên" />
        <Input placeholder="Số điện thoại" />
      </div>
      <TextArea
        placeholder="Ghi chú thêm cho chúng tôi(Không bắt buộc)"
        className="box__text--area"
      />
    </CustomerInfoStyled>
  );
}
