import styled from "styled-components";
import { TbShieldCheckFilled } from "react-icons/tb";
import { Heading } from "@/components/shared";
import { Link } from "react-router-dom";
import WarrantyItemOption from "./WarrantyItemOption";

const WarrantyStyled = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  margin-top: 2rem;
`;

const WarrantyDesc = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 1rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
    color: var(--color-primary);
  }

  .desc--box {
    .desc--heading {
      a {
        color: var(--color-primary);
        font-size: 1.2rem;
        font-style: italic;
        text-decoration: underline;
      }
    }
    .desc--note {
      font-size: 1.2rem;
      color: var(--color-text);
    }
  }
`;

const WarrantyOptionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Warranty() {
  return (
    <WarrantyStyled>
      <WarrantyDesc>
        <TbShieldCheckFilled />
        <div className="desc--box">
          <Heading $as="h5" className="desc--heading">
            Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng{" "}
            <Link to={"#"}>Xem chi tiết</Link>
          </Heading>
          <p className="desc--note">
            (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán
            tại cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá
            trị của gói bảo hành mở rộng)
          </p>
        </div>
      </WarrantyDesc>
      <WarrantyOptionsBox>
        <WarrantyItemOption />
        <WarrantyItemOption />
        <WarrantyItemOption />
      </WarrantyOptionsBox>
    </WarrantyStyled>
  );
}
