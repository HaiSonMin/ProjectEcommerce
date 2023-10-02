import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PromotionIcon from "@/assets/icons/svg/promotion.png";
import { randomKey } from "@/utils";

const HotPromotionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2rem;

  .promotion--header {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 2.8rem;
      height: 2.8rem;
    }
  }

  .promotion--images {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-box {
      border-radius: 1rem;
      overflow: hidden;
    }
  }
`;

const BlogsTest = [
  {
    image: "https://cdn.tgdd.vn/2023/09/banner/720-220-720x220-85.png",
    linkTo: "#",
  },
  {
    image: "https://cdn.tgdd.vn/2023/08/banner/720-220-720x220-25.png",
    linkTo: "#",
  },
  {
    image: "https://cdn.tgdd.vn/2023/09/banner/720x220-720x220-78.png",
    linkTo: "#",
  },
];

export default function HotPromotions() {
  return (
    <HotPromotionsStyled>
      <div className="promotion--header">
        <Heading $as="h4">Khuyến mãi hot</Heading>
        <img src={PromotionIcon} alt="Promotion icon" />
      </div>
      <div className="promotion--images">
        {BlogsTest.map((blog) => (
          <Link
            className="promotion--images-box"
            to={blog.linkTo}
            key={randomKey()}
          >
            <img src={blog.image} alt="Image blog" />
          </Link>
        ))}
      </div>
    </HotPromotionsStyled>
  );
}
