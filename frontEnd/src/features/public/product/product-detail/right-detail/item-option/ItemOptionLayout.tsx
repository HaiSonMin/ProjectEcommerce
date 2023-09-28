import { Heading } from "@/components";
import { css, styled } from "styled-components";
import ItemOption from "./ItemOption";
import { formatCurrencyVND } from "@/utils";

const OptionLayoutStyled = styled.div``;

const OptionsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .option--name {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 700;
  }
  .option--price {
    font-size: 1.2rem;
  }
`;

const OptionColorStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .box--image {
    img {
      object-fit: contain;
      object-position: center;
      aspect-ratio: 4/3;
    }
  }

  .box__option {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 1.2rem;

    & .box__option--color {
      font-weight: 700;
    }
    & .box__option--price {
      font-weight: 500;
    }
  }
`;

export default function ItemOptionLayout() {
  return (
    <OptionLayoutStyled>
      <OptionsBox>
        <ItemOption>
          <OptionStyled>
            <p className="option--name">1TB</p>
            <p className="option--price">{formatCurrencyVND(23000000)}</p>
          </OptionStyled>
        </ItemOption>
        <ItemOption>
          <OptionStyled>
            <p className="option--name">1TB</p>
            <p className="option--price">{formatCurrencyVND(23000000)}</p>
          </OptionStyled>
        </ItemOption>
        <ItemOption>
          <OptionStyled>
            <p className="option--name">1TB</p>
            <p className="option--price">{formatCurrencyVND(23000000)}</p>
          </OptionStyled>
        </ItemOption>
      </OptionsBox>
      <Heading $as="h6" className="mb-[8px]">Chọn màu yêu thích của bạn</Heading>
      <OptionsBox>
        <ItemOption>
          <OptionColorStyled>
            <div className="box--image">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-z-fold-5-kem-1_1.jpg"
                alt="image"
              />
            </div>
            <div className="box__option">
              <p className="box__option--color">Kem</p>
              <p className="box__option--price">
                {formatCurrencyVND(23000000)}
              </p>
            </div>
          </OptionColorStyled>
        </ItemOption>

        <ItemOption>
          <OptionColorStyled>
            <div className="box--image">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-z-fold-5-kem-1_1.jpg"
                alt="image"
              />
            </div>
            <div className="box__option">
              <p className="box__option--color">Kem</p>
              <p className="box__option--price">
                {formatCurrencyVND(23000000)}
              </p>
            </div>
          </OptionColorStyled>
        </ItemOption>
        <ItemOption>
          <OptionColorStyled>
            <div className="box--image">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-z-fold-5-kem-1_1.jpg"
                alt="image"
              />
            </div>
            <div className="box__option">
              <p className="box__option--color">Kem</p>
              <p className="box__option--price">
                {formatCurrencyVND(23000000)}
              </p>
            </div>
          </OptionColorStyled>
        </ItemOption>
      </OptionsBox>
    </OptionLayoutStyled>
  );
}
