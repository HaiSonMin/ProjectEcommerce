import { Heading } from "@/components/shared";
import { randomKey } from "@/utils";
import { PiGiftBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CartProductPromotionsStyled = styled.div`
  border: 1px solid var(--color-grey-300);
  overflow: hidden;
  border-radius: 1rem;

  .box__tile {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 1rem;
    border-bottom: 1px solid var(--color-grey-300);
    background-color:  var(--color-grey-100);

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--color-primary);
    }
  }

  .box__promotion {
    padding: 1rem;

    &--item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      font-weight: 500;

      &-number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-white);
        font-weight: 600;
        font-size: 1.2rem;
        margin-top: 3px;
      }
    }
  }
`;

const listGiftTest = [
  {
    key: randomKey(),
    promotionName:
      "Trả Góp 0% Qua Công Ty Tài Chính và Ngân Hàng ( xem chi tiết)",
    linkTo: "",
  },
  {
    key: randomKey(),
    promotionName: "Hoàn Tiền Nếu Siêu Thị Khác Rẻ Hơn (Chính sách)",
    linkTo: "",
  },
  {
    key: randomKey(),
    promotionName: "Hoàn Tiền Nếu Siêu Thị Khác Rẻ Hơn (Chính sách)",
    linkTo: "",
  },
];

export default function CartProductPromotions() {
  return (
    <CartProductPromotionsStyled>
      <div className="box__tile">
        <PiGiftBold />
        <Heading $as="h5" className="box__tile--heading">
          Quà tặng đi kèm
        </Heading>
      </div>
      <ul className="box__promotion">
        {listGiftTest.map((item, i) => (
          <li className="box__promotion--item" key={item.key}>
            <div className="box__promotion--item-number">
              <span>{i + 1}</span>
            </div>
            {item.linkTo ? (
              <Link className="box__promotion--item-name" to={item.linkTo}>
                {item.promotionName}
              </Link>
            ) : (
              <p className="box__promotion--item-name">{item.promotionName}</p>
            )}
          </li>
        ))}
      </ul>
    </CartProductPromotionsStyled>
  );
}
