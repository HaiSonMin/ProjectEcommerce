import styled from "styled-components";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";

const WarrantyInfoStyled = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 4.5rem 1.5rem 2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
`;

const WarrantyOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);

  svg {
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    color: var(--color-primary)
  }
`;

export default function WarrantyInfo() {
  return (
    <WarrantyInfoStyled>
      <WarrantyOption>
        <HiOutlineRefresh />
        <p>
          Hư gì đổi nấy <span className="font-semibold">12 tháng</span> tại 3361
          siêu thị toàn quốc (miễn phí tháng đầu)
        </p>
      </WarrantyOption>
      <WarrantyOption>
        <MdSecurity />
        <p>
          Bảo hành{" "}
          <span className="font-semibold">chính hãng điện thoại 18 tháng</span>{" "}
          tại các trung tâm bảo hành hãng
        </p>
      </WarrantyOption>
      <WarrantyOption>
        <BsFillBoxSeamFill />
        <p>
          Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Ốp lưng, Cáp Type
          C, Củ sạc rời đầu Type A
        </p>
      </WarrantyOption>
    </WarrantyInfoStyled>
  );
}
