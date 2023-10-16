import styled, { css, keyframes } from "styled-components";
import { useState } from "react";
import { GrShieldSecurity } from "react-icons/gr";
import { HiArrowSmRight } from "react-icons/hi";
import { Button, CycleChose, Heading, Hr, Overlay } from "@/components/shared";
import { formatCurrencyVND } from "@/utils";

const CartProductWarrantyStyled = styled.div``;

const BoxWarranty = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  background-color: var(--color-grey-100);
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
  }

  .select--warranty {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.4rem;
    margin-left: auto;
    color: var(--color-primary);
  }
`;

const animationModal = keyframes`
  0% {top: 40%; opacity: 0}
  100% {top: 50%; opacity: 1}
`;

const WarrantyModal = styled.div<{ $showModal: boolean }>`
  width: 50rem;
  position: fixed;
  left: 50%;
  padding: 2rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-400);
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.$showModal &&
    css`
      animation: ${animationModal} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
    `}

  .warranty--note {
    display: block;
    font-size: 1.4rem;
    margin-top: 1rem;
  }
`;

const BoxItemWarranty = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
`;

const ItemWarranty = styled.div<{ $isChose: boolean }>`
  position: relative;
  width: 100%;
  padding: 5px;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  ${(props) =>
    props.$isChose &&
    css`
      border-color: var(--color-primary);
      &::after {
        display: block;
        content: "✓";
        position: absolute;
        right: 0px;
        top: 0px;
        height: 15px;
        width: 17px;
        background-color: var(--color-primary);
        border-radius: 0 0 0 1rem;
        color: var(--color-white);
        font-size: 10px;
        padding-left: 4px;
      }
    `}

  .warranty--name {
    width: 95%;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.4rem;
  }
  .warranty--price {
    margin-top: 5px;
    font-size: 1.4rem;

    span {
      color: var(--color-primary);
      font-weight: 600;
    }
  }
`;

const BoxConfirmBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const WarrantiesTest = [
  {
    name: "1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng",
    price: 500_000,
  },
  {
    name: "S24+ 12 tháng: Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng",
    price: 1_000_000,
  },
  {
    name: "1 đổi 1 VIP 12 tháng: Đổi máy mới tương đương khi có lỗi từ NSX trong 12 tháng",
    price: 1_500_000,
  },
  {
    name: "Rơi vỡ - Rớt nước: Hỗ trợ 90% chi phí sửa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng",
    price: 2_000_000,
  },
];

export default function CartProductWarranty() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [choseWarranty, setChoseWarranty] = useState<number>(0);
  const openModal = () => setIsShowModal(true);
  const closeModal = () => setIsShowModal(false);

  return (
    <CartProductWarrantyStyled>
      <BoxWarranty onClick={openModal}>
        <GrShieldSecurity />
        <p>
          Chọn dịch vụ <strong>Bảo hành mở rộng</strong>
        </p>
        <div className="select--warranty">
          <span>Chọn gói</span>
          <HiArrowSmRight />
        </div>
      </BoxWarranty>
      <Overlay $isShow={isShowModal} onClick={closeModal}>
        <WarrantyModal
          $showModal={isShowModal}
          onClick={(e) => e.stopPropagation()}
        >
          <Heading $as="h4">Bảo vệ sản phẩm toàn diện </Heading>
          <i className="warranty--note">
            (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán
            tại cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá
            trị của gói bảo hành mở rộng)
          </i>
          <BoxItemWarranty>
            {WarrantiesTest.map((item, i) => (
              <ItemWarranty $isChose={true}>
                <div className="warranty--name">
                  <div className="warranty--name-icon">
                    <CycleChose isChose={true} size="1.6rem" />
                  </div>
                  <p>{item.name}</p>
                </div>
                <p className="warranty--price">
                  Giá chỉ: <span>{formatCurrencyVND(item.price)}</span>
                </p>
              </ItemWarranty>
            ))}
          </BoxItemWarranty>
          <Hr />
          <BoxConfirmBtn>
            <Button $variation="secondary" onClick={closeModal}>
              Hủy
            </Button>
            <Button onClick={closeModal}>Xác nhận</Button>
          </BoxConfirmBtn>
        </WarrantyModal>
      </Overlay>
    </CartProductWarrantyStyled>
  );
}
