import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrencyVND } from "@/utils";
import styled, { css } from "styled-components";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { CycleChose } from "@/components";

const CartProductInfoStyled = styled.div``;

const CartProductInfoTop = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const LeftInfo = styled.div`
  width: 11rem;
  flex-shrink: 0;
  .box__image {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-grey-300);
    padding: 8px;
    img {
      object-fit: contain;
      object-position: center;
      transition: all 300ms;
    }

    &:hover {
      img {
        scale: 1.05;
      }
    }
  }
`;

const RightInfo = styled.div`
  position: relative;
  width: 100%;
  .product__name {
    width: 90%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .product__price {
    &--all {
      display: flex;
      align-items: center;
      gap: 1rem;
      &-sale {
        color: var(--color-primary);
        font-weight: 600;
      }
      &-origin {
        font-size: 1.2rem;
        text-decoration: line-through;
        color: var(--color-grey-500);
      }
      &-discount {
        font-size: 1.2rem;
        display: inline-block;
        padding: 0 5px;
        color: var(--color-white);
        font-weight: 300;
        background-color: var(--color-primary);
        border-radius: 5px;
      }
    }
    &--save {
      font-size: 1.4rem;
      span {
        color: var(--color-primary);
        font-weight: 600;
      }
    }
  }

  .chose-input {
    position: absolute;
    border-color: var(--color-primary);
    box-shadow: var(--color-primary) 0px 0px 2px 1px;

    &::after {
      position: absolute;
      display: block;
      content: "";
      width: 1.2rem;
      height: 1.2rem;
      left: 50%;
      top: 50%;
      background-color: var(--color-primary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ChoseItem = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const CartProductInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .product__info {
    display: flex;
    gap: 5px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .product__amount {
    display: flex;
    gap: 5px;

    &--change {
      display: flex;
      align-items: center;
      gap: 5px;

      &-btn {
        width: 2.6rem;
        height: 2.6rem;
        cursor: pointer;
        color: var(--color-primary);
      }

      &-number {
        font-weight: 600;
      }
    }
  }
`;

export default function CartProductInfo() {
  const [isChoseItem, setIsChoseItem] = useState<boolean>(false);

  const handleToggleChoseItem = () => setIsChoseItem(!isChoseItem);

  return (
    <CartProductInfoStyled>
      <CartProductInfoTop>
        <LeftInfo>
          <Link to={"#"} className="box__image">
            <img
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_product_32021/iphone-14-pro-m_main_538_450.png.webp"
              alt="Image product"
            />
          </Link>
        </LeftInfo>
        <RightInfo>
          <Link to={"#"} className="product__name">
            Iphone 14 Pro Max 256GB Đen{" "}
          </Link>
          <br />
          <div className="product__price">
            <p className="product__price--all">
              <p className="product__price--all-sale">
                {formatCurrencyVND(28_990_000)}
              </p>
              <p className="product__price--all-origin">
                {" "}
                {formatCurrencyVND(32_990_000)}
              </p>
              <p className="product__price--all-discount">-34%</p>
            </p>
            <p className="product__price--save">
              (Tiết kiệm: <span>{formatCurrencyVND(4_000_000)}</span>)
            </p>
          </div>
          <ChoseItem onClick={handleToggleChoseItem}>
            <CycleChose isChose={isChoseItem} />
          </ChoseItem>
        </RightInfo>
      </CartProductInfoTop>
      <CartProductInfoBottom>
        <div className="product__info">
          <span>Đen</span>
          <span>126GB</span>
        </div>
        <div className="product__amount">
          <span>Số lượng:</span>
          <div className="product__amount--change">
            <AiOutlinePlusCircle className="product__amount--change-btn" />
            <div className="product__amount--change-number">12</div>
            <AiOutlineMinusCircle className="product__amount--change-btn" />
          </div>
        </div>
      </CartProductInfoBottom>
    </CartProductInfoStyled>
  );
}
