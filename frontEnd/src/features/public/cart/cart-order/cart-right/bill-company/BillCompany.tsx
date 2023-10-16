import { Input, InputChecked } from "@/components/shared";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BillCompanyStyled = styled.div`
  padding: 2rem;

  .box--input {
    margin-top: 1rem;
    &-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }
    &-address {
    }
  }

  .rule {
    font-size: 1.2rem;
    margin-top: 1.5rem;
    a {
      font-weight: 600;
      color: var(--color-primary);
    }
  }
`;

export default function BillCompany() {
  const [isExportBillCompany, setIsExportBillCompany] =
    useState<boolean>(false);

  const handleToggleExport = () => setIsExportBillCompany(!isExportBillCompany);
  return (
    <BillCompanyStyled>
      <div onClick={handleToggleExport}>
        <InputChecked
          isChose={isExportBillCompany}
          label="Xuất hóa đơn công ty"
        />
      </div>
      {isExportBillCompany && (
        <div className="box--input">
          <div className="box--input-info">
            <Input type="text" placeholder="Mã số thuế công ty" />
            <Input type="text" placeholder="Tên công ty" />
          </div>
          <div className="box--input-address">
            <Input type="text" placeholder="Địa chỉ công ty" />
          </div>
        </div>
      )}
      <p className="rule">
        Bằng cách thanh toán, bạn đã đồng ý với các{" "}
        <Link to={"#"}>Điều khoảng sử dụng</Link> của hệ thống bên chúng tôi
      </p>
    </BillCompanyStyled>
  );
}
