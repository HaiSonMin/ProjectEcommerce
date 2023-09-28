import { formatCurrencyVND } from "@/utils";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const WarrantyItemOptionStyled = styled.div<{ $isActive: boolean }>`
  position: relative;
  padding: 5px 1.5rem 5px 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;

  ${(props) =>
    props.$isActive &&
    css`
      &::before {
        display: block;
        content: "✓";
        font-size: 1rem;
        width: 1.8rem;
        height: 1.5rem;
        position: absolute;
        border-bottom-left-radius: 1rem;
        top: 0;
        right: 0;
        color: #fff;
        padding-left: 5px;
        background-color: var(--color-primary);
      }
    `}
`;

const WarrantyItemTop = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;

  .warranty__top--checkbox {
    position: relative;
    width: 1.4rem;
    height: 1.4rem;
    border: 1px solid var(--color-grey-500);
    border-color: ${(props) => props.$isActive && "var(--color-primary)"};
    border-radius: 50%;
    flex-shrink: 0;

    ${(props) =>
      props.$isActive &&
      css`
        &::before {
          display: block;
          content: "";
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--color-primary);
        }
      `}
  }

  .warranty__top--title {
    font-size: 1.4rem;
    line-height: 1.35;
  }
`;

const WarrantyItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  .warranty__bottom--price {
    font-size: 1.2rem;
    font-weight: 600;
    span {
      color: var(--color-primary);
    }
  }
  .warranty__bottom--link {
    font-size: 1.2rem;
    font-style: italic;
    color: var(--color-primary);
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function WarrantyItemOption() {
  return (
    <WarrantyItemOptionStyled $isActive={true}>
      <WarrantyItemTop $isActive={true}>
        <div className="warranty__top--checkbox" />
        <p className="warranty__top--title">
          1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 6
          tháng
        </p>
      </WarrantyItemTop>
      <WarrantyItemBottom>
        <p className="warranty__bottom--price">
          Giá chỉ: <span>{formatCurrencyVND(1800000)}</span>
        </p>
        <Link className="warranty__bottom--link" to={"#"}>
          Xem chi tiết
        </Link>
      </WarrantyItemBottom>
    </WarrantyItemOptionStyled>
  );
}
