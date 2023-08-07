import { Link } from "react-router-dom";
import { styled } from "styled-components";

const FooterCertificationStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  text-align: center;
  color: var(--color-grey-500);
`;

const CertificationLogo = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const CertificationLink = styled(Link)`
  display: inline-block;
  width: 8rem;
  height: 4rem;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

export default function FooterCertification() {
  return (
    <FooterCertificationStyled>
      <p>
        Công ty TNHH Thương Mại và Dịch Vụ Kỹ Thuật DIỆU PHÚC - GPĐKKD:
        0316172372 cấp tại Sở KH & ĐT TP. HCM. Địa chỉ văn phòng: 350-352 Võ Văn
        Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam. Điện
        thoại: 028.7108.9666.
      </p>
      <CertificationLogo>
        <CertificationLink
          target="_blank"
          rel="noopener noreferrer"
          to="http://online.gov.vn/Home/WebDetails/75641?AspxAutoDetectCookieSupport=1"
        >
          <img
            src="https://cdn2.cellphones.com.vn/80x,webp/media/logo/logoSaleNoti.png"
            alt="Logo Certification1"
          />
        </CertificationLink>
        <CertificationLink
          target="_blank"
          rel="noopener noreferrer"
          to="https://www.dmca.com/Protection/Status.aspx?ID=158f5667-cce3-4a18-b2d1-826225e6b022&refurl=https://cellphones.com.vn/"
        >
          <img
            src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
            alt="Logo Certification2"
          />
        </CertificationLink>
      </CertificationLogo>
    </FooterCertificationStyled>
  );
}
