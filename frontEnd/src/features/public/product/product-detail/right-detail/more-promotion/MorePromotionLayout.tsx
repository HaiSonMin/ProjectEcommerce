import { Heading } from "@/components/shared";
import styled from "styled-components";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MorePromotionLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  overflow: hidden;
`;

const Header = styled.div`
  background-color: var(--color-grey-300);
  padding: 1rem;
  text-transform: uppercase;
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

  .link--promotion {
    font-size: 1.2rem;
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

export default function MorePromotionLayout() {
  return (
    <MorePromotionLayoutStyled>
      <Header>
        <Heading $as="h5">Ưu đãi thêm khi mua hàng</Heading>
      </Header>
      <Body>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)
          </Link>
        </PromotionItem>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            Ưu đãi đến 500k khi mở thẻ VP Bank
          </Link>
        </PromotionItem>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            Giảm thêm 5% tối đa 200.000đ khi thanh toán qua Kredivo
          </Link>
        </PromotionItem>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            Mở thẻ tín dụng VIB - Nhận voucher 200.000đ mua hàng tại CellphoneS
          </Link>
        </PromotionItem>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            {" "}
            Giảm 500k đơn hàng từ 10 triệu (trừ các sản phẩm Apple)
          </Link>
        </PromotionItem>
        <PromotionItem>
          <BsFillPatchCheckFill />
          <Link to={"#"} className="link--promotion">
            Nhập mã “TUUTRUONG” - Giảm 30% khi đăng ký gói ELSA PRO từ 6 tháng
            trở lên
          </Link>
        </PromotionItem>
      </Body>
    </MorePromotionLayoutStyled>
  );
}
