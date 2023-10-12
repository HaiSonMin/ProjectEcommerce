import { Link } from "react-router-dom";
import styled from "styled-components";
import IconEmail from "@/assets/icons/member/support/email.png";
import IconAdvise from "@/assets/icons/member/support/advise.png";
import IconComplain from "@/assets/icons/member/support/complain.png";
import IconWarranty from "@/assets/icons/member/support/warranty.png";

const MemberSupportLayoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 1rem;
`;
const CartSupport = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  gap: 3rem;
  border-radius: 1rem;
  width: 43rem;
  margin-bottom: 2.5rem;

  .box--icon {
    width: 6rem;
    height: 6rem;
    img {
      object-fit: contain;
      object-position: center;
    }
  }

  .box--contact {
    &-link {
      font-size: 1.6rem;
      font-weight: 600;
      color: var(--color-primary);
    }
  }
`;

export default function MemberSupportLayout() {
  return (
    <MemberSupportLayoutStyled>
      <CartSupport>
        <div className="box--icon">
          <img src={IconAdvise} alt="" />
        </div>
        <div className="box--contact">
          <p className="box--contact-title">Tư vấn mua hàng (8h00 - 22h00)</p>
          <a href={"tel:0345299087"} className="box--contact-link">
            0345.299.087
          </a>
        </div>
      </CartSupport>
      <CartSupport>
        <div className="box--icon">
          <img src={IconWarranty} alt="" />
        </div>
        <div className="box--contact">
          <p className="box--contact-title">Bảo hành (8h00 - 21h00)</p>
          <a href={"tel:0345299087"} className="box--contact-link">
            0345.299.087
          </a>
        </div>
      </CartSupport>
      <CartSupport>
        <div className="box--icon">
          <img src={IconComplain} alt="" />
        </div>
        <div className="box--contact">
          <p className="box--contact-title">Khiếu nại (8h00 - 21h30)</p>
          <a href={"tel:0345299087"} className="box--contact-link">
            0345.299.087
          </a>
        </div>
      </CartSupport>
      <CartSupport>
        <div className="box--icon">
          <img src={IconEmail} alt="" />
        </div>
        <div className="box--contact">
          <p className="box--contact-title">Liên hệ email</p>
          <a href={"mailto:hson22102000@gmail.com"} className="box--contact-link">
            hson22102000@gmail.com
          </a>
        </div>
      </CartSupport>
    </MemberSupportLayoutStyled>
  );
}
