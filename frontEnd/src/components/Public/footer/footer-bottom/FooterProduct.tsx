import { styled } from "styled-components";

const FooterProductStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function FooterProduct() {
  return (
    <FooterProductStyled>
      <p>
        Công ty TNHH Thương Mại và Dịch Vụ Kỹ Thuật DIỆU PHÚC - GPĐKKD:
        0316172372 cấp tại Sở KH & ĐT TP. HCM. Địa chỉ văn phòng: 350-352 Võ Văn
        Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam. Điện
        thoại: 028.7108.9666
      </p>
    </FooterProductStyled>
  );
}
