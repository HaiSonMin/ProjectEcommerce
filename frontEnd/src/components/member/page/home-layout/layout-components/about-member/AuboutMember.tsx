import styled from "styled-components";
import AboutCart from "./about-cart/AboutCart";
import IconPromotionMember from "@/assets/icons/icon-member-card/gift-box.png";
import IconOrderMember from "@/assets/icons/icon-member-card/delivery-man.png";
import IconRankingMember from "@/assets/icons/icon-member-card/ranking.png";

const AboutMemberStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

export default function AboutMember() {
  return (
    <AboutMemberStyled>
      <AboutCart
        icon={IconPromotionMember}
        bgColorCard={"var(--color-red-100)"}
        heading={"Ưu đãi của bạn"}
        linkToSee={"#"}
        valueCart={"0 ưu đãi"}
      />
      <AboutCart
        icon={IconOrderMember}
        bgColorCard={"var(--color-indigo-100)"}
        heading={"Đơn hàng của bạn"}
        linkToSee={"#"}
        valueCart={"2 đơn hàng"}
      />
      <AboutCart
        icon={IconRankingMember}
        bgColorCard={"var(--color-blue-200)"}
        heading={"Hạng thành viên"}
        linkToSee={"#"}
        valueCart={"Bạn đang là sMember"}
      />
    </AboutMemberStyled>
  );
}
