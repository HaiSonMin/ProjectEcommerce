import { styled } from 'styled-components';
import { duplicateObject, randomKey } from '@/utils';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoDuplicateOutline } from 'react-icons/io5';
import { IProductOption } from '@/interfaces/shared';
import { Collapse } from 'antd';
import ProductOptionComponent from './ProductOptionComponent';
import ProductOptionProvider from '../context';

const ProductFilterOptionStyled = styled.div``;

const BtnAddFilterOption = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  cursor: pointer;
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const ProductOptionBox = styled.div``;

const ProductOptionCollapse = styled(Collapse)`
  & .ant-collapse-header {
    align-items: center !important;

    & .ant-collapse-extra {
      & svg {
        width: 1.8rem;
        height: 1.8rem;
        transition: all 0.3s;
        &:hover {
          scale: 1.1;
          color: var(--color-primary);
        }
      }
    }
  }
`;

const FeatureOption = styled.div`
  display: flex;
  gap: 1rem;
`;

interface IProps {
  isEdit: boolean;
  productOptions: Array<IProductOption> | undefined;
  setProductOptions: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductOption({
  isEdit,
  productOptions = [],
  setProductOptions,
}: IProps) {
  const handlerAddProductOption = () => {
    const newProductOptions: Array<IProductOption> = [
      ...productOptions,
      {
        id: randomKey(),
        product_optionName: '',
        product_description: '',
        product_priceDifference: 0,
        product_specificationMain: [],
        product_specificationDetail: '',
        product_serials: [
          {
            id: randomKey(),
            serialName: '',
            serialImage: '',
            serialPriceDifference: 0,
          },
        ],
      },
    ];
    setProductOptions(newProductOptions);
  };

  const handlerDeleteProductOption = (
    event: React.ChangeEvent<HTMLDivElement>,
    indexOption: number
  ) => {
    event.stopPropagation();
    if (productOptions.length <= 1) return;
    const newProductOptions = [...productOptions];
    newProductOptions.splice(indexOption, 1);
    setProductOptions(newProductOptions);
  };

  const handlerDuplicateProductOption = (
    event: React.ChangeEvent<HTMLDivElement>,
    indexOption: number
  ) => {
    event.stopPropagation();
    const newOption: IProductOption = duplicateObject({
      ...productOptions[indexOption],
    });
    const newProductOptions: Array<IProductOption> = [
      ...productOptions,
      newOption,
    ];
    setProductOptions(newProductOptions);
  };
  return (
    <ProductOptionProvider
      isEdit={isEdit}
      productOptions={productOptions}
      setProductOptions={setProductOptions}
    >
      <ProductFilterOptionStyled>
        <BtnAddFilterOption onClick={handlerAddProductOption}>
          Add New Product Option
        </BtnAddFilterOption>
        <ProductOptionBox>
          <ProductOptionCollapse
            expandIconPosition={'start'}
            items={productOptions.map((option: IProductOption, indexOption) => {
              return {
                key: option.id,
                label: (
                  <div>
                    Option của sản phẩm {indexOption + 1}:{' '}
                    <span className='font-bold'>
                      {productOptions[indexOption].product_optionName}
                    </span>
                  </div>
                ),
                children: <ProductOptionComponent indexOption={indexOption} />,

                extra: (
                  <FeatureOption>
                    <IoDuplicateOutline
                      onClick={(e: any) =>
                        handlerDuplicateProductOption(e, indexOption)
                      }
                    />
                    <RiDeleteBin5Line
                      onClick={(e: any) =>
                        handlerDeleteProductOption(e, indexOption)
                      }
                    />
                  </FeatureOption>
                ),
              };
            })}
          />
        </ProductOptionBox>
      </ProductFilterOptionStyled>
    </ProductOptionProvider>
  );
}
