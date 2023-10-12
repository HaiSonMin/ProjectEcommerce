import { styled } from "styled-components";
import { BiCreditCard } from "react-icons/bi";
import { LiaMedalSolid } from "react-icons/lia";
import { ContainerImage } from "@/components";

const OutstandingLayoutOfferStyled = styled.div`
  box-shadow: var(--shadow-lg);
  border-radius: 1rem;
  overflow: hidden;
  border-bottom: 1px solid #bbb;
  margin-top: 2rem;
`;

const OutstandingLayoutOfferHeader = styled.div`
  padding: 1rem 0;
  text-align: center;
  background-color: var(--color-primary);

  & span {
    font-size: 3.4rem;
    text-transform: uppercase;
    color: var(--color-white);
    text-shadow: var(--color-white) 2px 1px 6px;
  }
`;

const OutStandingLayoutBody = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OutStandingLayoutTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 2rem;

  & svg {
    width: 3rem;
    height: 3rem;
  }

  & span {
    font-size: 1.8rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text);
  }
`;

const itemsImgPayment = [
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/OCB/Q2/936x376px.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/VPBANK/Q3/936x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/HOME%20CREDIT%20CARD/Q3/home-credit_936x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/Sacombank/936x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/MOMO/Jul/momo_936x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/CT%20TH%C3%81NG/Aug/936x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/PARTNERSHIP/2023/VIB/Amex/VIB_936x376.jpg",
    linkTo: "#",
  },
];

const itemsImgBrand = [
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0823/REALME%2011/Onsite/937x376.jpg",
    linkTo: "#",
  },
  {
    img: "https://cdn.nguyenkimmall.com/images/companies/_1/MKT_ECM/0723/PANASONIC/Onsite/new/Partnership%20banner%20new.png",
    linkTo: "#",
  },
];

export default function OutstandingLayoutOfferLayout() {
  return (
    <OutstandingLayoutOfferStyled>
      <OutstandingLayoutOfferHeader>
        <span>Ưu đãi nỗi bật</span>
      </OutstandingLayoutOfferHeader>
      <OutStandingLayoutBody>
        <div>
          <OutStandingLayoutTitle>
            <BiCreditCard />
            <span>Ưu đãi thanh toán</span>
          </OutStandingLayoutTitle>
          <ContainerImage
            gapValue={1}
            withImg={39}
            numberProductDisplay={3}
            itemsImg={itemsImgPayment}
          />
        </div>
        <div>
          <OutStandingLayoutTitle>
            <LiaMedalSolid />
            <span>Ưu đãi thương hiệu</span>
          </OutStandingLayoutTitle>
          <ContainerImage
            gapValue={1}
            withImg={39}
            numberProductDisplay={3}
            itemsImg={itemsImgBrand}
          />
        </div>
      </OutStandingLayoutBody>
    </OutstandingLayoutOfferStyled>
  );
}
