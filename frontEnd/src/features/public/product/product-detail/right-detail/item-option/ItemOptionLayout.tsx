import { Heading } from '@/components/shared';
import { css, styled } from 'styled-components';
import ItemOption from './ItemOption';
import { formatCurrencyVND } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStateProductDetail,
  setChoseColorProduct,
  setChoseOptionProduct,
} from '@/storeReducer/public/productDetailSlice';

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
  const dispatch = useDispatch();
  const { product, optionChose, optionColorChose } = useSelector(
    getStateProductDetail
  );

  console.log('product?.product_options::::', product?.product_options);
  return (
    <OptionLayoutStyled>
      <OptionsBox>
        {product?.product_options.map((option, i) => (
          <ItemOption
            key={option.id}
            isActive={i === optionChose}
            onClick={() => dispatch(setChoseOptionProduct(i))}
          >
            <OptionStyled>
              <p className='option--name'>{option.product_optionName}</p>
              <p className='option--price'>
                {formatCurrencyVND(
                  product.product_price +
                    Number(product.product_options[i].product_priceDifference)
                )}
              </p>
            </OptionStyled>
          </ItemOption>
        ))}
      </OptionsBox>
      <Heading $as='h6' className='mb-[8px]'>
        Chọn màu yêu thích của bạn
      </Heading>
      <OptionsBox>
        {product?.product_options[optionChose].product_serials?.map(
          (serial, i) => (
            <ItemOption
              key={serial.id}
              isActive={i === optionColorChose}
              onClick={() => dispatch(setChoseColorProduct(i))}
            >
              <OptionColorStyled>
                <div className='box--image'>
                  <img src={serial.serialImage} alt='image' />
                </div>
                <div className='box__option'>
                  <p className='box__option--color'>{serial.serialName}</p>
                  <p className='box__option--price'>
                    {formatCurrencyVND(
                      product.product_price +
                        Number(
                          product.product_options[optionChose]
                            .product_priceDifference
                        ) +
                        Number(
                          product.product_options[optionChose]
                            ?.product_serials?.[i]?.serialPriceDifference
                        )
                    )}
                  </p>
                </div>
              </OptionColorStyled>
            </ItemOption>
          )
        )}
      </OptionsBox>
    </OptionLayoutStyled>
  );
}
