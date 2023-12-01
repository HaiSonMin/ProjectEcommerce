import styled, { css } from 'styled-components';
import { CarouselImageProductDetail } from '@/components/shared';
import { RiMedalLine } from 'react-icons/ri';
import { SiEbox } from 'react-icons/si';
import { GoInfo } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStateProductDetail,
  setChoseColorImageProduct,
} from '@/storeReducer/public/productDetailSlice';

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

const BoxImage = styled.div<{ $isActive?: boolean }>`
  display: flex;
  width: 100%;
  height: 5.5rem;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-400);
  ${(props) =>
    props.$isActive &&
    css`
      border: 2px solid var(--color-primary);
    `}
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

export default function BoxImageLayout() {
  const { product, optionColorChoseImage } = useSelector(getStateProductDetail);

  const dispatch = useDispatch();

  return (
    <BoxImageLayoutStyled>
      <CarouselImageProductDetail
        images={product?.product_imagesProduct as Array<string>}
      />
      <ScrollTabImage>
        <TabImageHighlight>
          <BoxImage>
            <RiMedalLine />
          </BoxImage>
          <span className='desc'>Điểm nổi bật</span>
        </TabImageHighlight>
        {product?.product_options?.[0]?.product_serials?.map((image, i) => (
          <TabImageHighlight
            onClick={() => dispatch(setChoseColorImageProduct(i))}
          >
            <BoxImage $isActive={i === optionColorChoseImage}>
              <img src={image.serialImage} alt={`image ${image.serialName}`} />
            </BoxImage>
            <span className='desc'>{image.serialName}</span>
          </TabImageHighlight>
        ))}
        <TabImageHighlight>
          <BoxImage>
            <SiEbox />
          </BoxImage>
          <span className='desc'>Thông số kỹ thuật</span>
        </TabImageHighlight>
        <TabImageHighlight>
          <BoxImage>
            <GoInfo />
          </BoxImage>
          <span className='desc'>Thông tin sản phẩm</span>
        </TabImageHighlight>
      </ScrollTabImage>
    </BoxImageLayoutStyled>
  );
}
