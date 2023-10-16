import Heading from "@/components/shared/Heading";
import styled from "styled-components";
import { BlogsMoreView, HotPromotions } from "../../shared";

const BodyCategoryRightLayoutStyled = styled.div``;

export default function BodyCategoryRightLayout() {
  return (
    <BodyCategoryRightLayoutStyled>
      <BlogsMoreView blogs={[]} />
      <HotPromotions />
    </BodyCategoryRightLayoutStyled>
  );
}
