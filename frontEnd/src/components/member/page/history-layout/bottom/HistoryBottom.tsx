import styled from "styled-components";
import { useState } from "react";
import EmptyCart from "@/assets/icons/member/history/empty-cart.png";
import { randomKey } from "@/utils";

const HistoryBottomStyled = styled.div`
  margin-top: 2rem;
`;

const BoxBtnOrder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  .btn {
    font-weight: 500;
    border: 1px solid var(--color-grey-300);
    border-radius: 4px;
    padding: 7px 1.4rem;
    cursor: pointer;
  }

  .btn.active {
    color: var(--color-white);
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }
`;

const DataOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  width: 100%;

  .box--image {
    width: 18rem;
    height: 18rem;

    img {
      object-fit: contain;
      object-position: center;
    }
  }

  p {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const BtnOrderApi = [
  {
    key: randomKey(),
    title: "Tất cả",
    paramOption: "",
  },
  {
    key: randomKey(),
    title: "Chờ xác nhận",
    paramOption: "",
  },
  {
    key: randomKey(),
    title: "Đã xác nhận",
    paramOption: "",
  },
  {
    key: randomKey(),
    title: "Đang vận chuyển",
    paramOption: "",
  },
  {
    key: randomKey(),
    title: "Đã giao",
    paramOption: "",
  },
  {
    key: randomKey(),
    title: "Đã hủy",
    paramOption: "",
  },
];
export default function HistoryBottom() {
  const [keyBtnActive, setKeyBtnActive] = useState<string>(BtnOrderApi[0].key);

  const handleCallApi = (key) => {
    setKeyBtnActive(key);
  };

  return (
    <HistoryBottomStyled>
      <BoxBtnOrder>
        {BtnOrderApi.map((btnOrder) => (
          <div
            className={`btn ${btnOrder.key === keyBtnActive && "active"}`}
            key={btnOrder.key}
            onClick={() => handleCallApi(btnOrder.key)}
          >
            {btnOrder.title}
          </div>
        ))}
      </BoxBtnOrder>
      <DataOrder>
        <div className="box--image">
          <img src={EmptyCart} alt="Empty cart" />
        </div>
        <p>Không có đơn hàng nào thỏa mản </p>
      </DataOrder>
    </HistoryBottomStyled>
  );
}
