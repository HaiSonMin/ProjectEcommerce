import { Heading } from "@/components";
import { HiOutlineGift } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PromotionLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-red-200);
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-red-200);
  padding: 1rem;
  text-transform: uppercase;
  color: var(--color-primary);

  svg {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
  }

  .heading {
    color: var(--color-primary);
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 5px;
`;

const PromotionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .number--order {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background-color: var(--color-primary);
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
  }

  .link--promotion {
    font-size: 1.4rem;
    font-weight: 500;

    &:hover {
      color: var(--color-primary);
    }
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
    flex-shrink: 0;
    color: var(--color-green-900);
  }
`;

export default function PromotionLayout() {
  return (
    <PromotionLayoutStyled>
      <Header>
        <HiOutlineGift />
        <Heading $as="h5" className="heading">
          Khuyến mãi đặc biệt
        </Heading>
      </Header>
      <Body>
        <PromotionItem>
          <span className="number--order">1</span>
          <Link to={"#"} className="link--promotion">
            Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
          </Link>
        </PromotionItem>
        <PromotionItem>
          <span className="number--order">2</span>
          <Link to={"#"} className="link--promotion">
            Ưu đãi đến 500k khi mở thẻ VP Bank
          </Link>
        </PromotionItem>
        <PromotionItem>
          <span className="number--order">3</span>
          <Link to={"#"} className="link--promotion">
            Trả góp 12 tháng 0 lãi, 0đ trả trước qua Samsung Finance+
          </Link>
        </PromotionItem>
        <PromotionItem>
          <span className="number--order">4</span>
          <Link to={"#"} className="link--promotion">
            Thu cũ đổi mới giảm ngay 2.000.000đ - Giá thu tốt nhất thị trường
          </Link>
        </PromotionItem>
      </Body>
    </PromotionLayoutStyled>
  );
}
