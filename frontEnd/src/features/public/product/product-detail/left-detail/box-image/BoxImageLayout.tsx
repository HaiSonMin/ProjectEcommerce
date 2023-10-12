import styled, { css } from "styled-components";
import { CarouselImageProductDetail } from "@/components/shared";
import { RiMedalLine } from "react-icons/ri";
import { SiEbox } from "react-icons/si";
import { GoInfo } from "react-icons/go";

const BoxImageLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScrollTabImage = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: center;
  align-items: flex-start;
`;

const TabImageCss = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 5.5rem;
`;

const TabImageHighlight = styled.div`
  ${TabImageCss}
  & .desc {
    line-height: 1.3;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
  }
`;

const BoxImage = styled.div`
  display: flex;
  width: 100%;
  height: 5.5rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-400);
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & svg {
    width: 60%;
    height: 60%;
  }

  & img {
    aspect-ratio: 6/5;
    object-fit: contain;
    object-position: center;
  }
`;

const imageTest = [
  "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-200x200.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-200x200.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-bac-thumb-200x200.jpg",
];

export default function BoxImageLayout() {
  return (
    <BoxImageLayoutStyled>
      <CarouselImageProductDetail items={[]} />
      <ScrollTabImage>
        <TabImageHighlight>
          <BoxImage>
            <RiMedalLine />
          </BoxImage>
          <span className="desc">Điểm nổi bật</span>
        </TabImageHighlight>
        {imageTest.map((image, i) => (
          <TabImageHighlight>
            <BoxImage>
              <img src={image} alt={`image ${i}`} />
            </BoxImage>
            <span className="desc">index {i}</span>
          </TabImageHighlight>
        ))}
        <TabImageHighlight>
          <BoxImage>
            <SiEbox />
          </BoxImage>
          <span className="desc">Thông số kỹ thuật</span>
        </TabImageHighlight>
        <TabImageHighlight>
          <BoxImage>
            <GoInfo />
          </BoxImage>
          <span className="desc">Thông tin sản phẩm</span>
        </TabImageHighlight>
      </ScrollTabImage>
    </BoxImageLayoutStyled>
  );
}
