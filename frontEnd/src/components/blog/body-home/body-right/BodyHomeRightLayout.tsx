import { Heading, CarouselCardBlog } from "@/components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { randomKey } from "@/utils";
import { IoIosArrowForward } from "react-icons/io";
import { HotPromotions } from "../../shared";

const BodyHomeRightLayoutStyled = styled.div``;

const BoxGoodFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .food--header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    &-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--color-primary);
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
`;

const BoxPromotion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

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

const FoodsTest = [
  {
    title: "Cách làm cánh gà chiên giòn rất ngon và tuyệt hảo yeahhhh",
    thumb:
      "https://cdn.tgdd.vn/2021/08/CookProductThumb/BeFunky-collage(5)-620x620-2.jpg",
    linkTo: "#",
  },
  {
    title: "Cách làm bánh xèo miền tây",
    thumb:
      "https://cdn.tgdd.vn/2021/06/CookProductThumb/Cachlambanhkhoailangchienphongthomngongionrumaicungme.-620x620.jpg",
    linkTo: "#",
  },
  {
    title: "Cách làm bánh rán doraemon",
    thumb:
      "https://cdn.tgdd.vn/2022/01/CookDishThumb/cach-lam-ha-cao-xiu-mai-tom-hap-thom-ngon-chuan-vi-don-gian-thumb-620x620.jpg",
    linkTo: "#",
  },
];

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

export default function BodyHomeRightLayout() {
  return (
    <BodyHomeRightLayoutStyled>
      <BoxGoodFood>
        <div className="food--header">
          <Heading $as="h4" className="food--header-title">
            Món ngon mỗi ngày
          </Heading>
          <Link to={"#"} className="food--header-link">
            <span>Xem tất cả</span>
            <IoIosArrowForward />
          </Link>
        </div>
        <div className="food--body">
          <CarouselCardBlog items={FoodsTest} />
        </div>
      </BoxGoodFood>
      <HotPromotions />
    </BodyHomeRightLayoutStyled>
  );
}
