import { Heading } from '@/components/shared';
import { IDemand } from '@/interfaces/models/demand.interface';
import { styled } from 'styled-components';

const ProductDemandsLayoutStyled = styled.div`
  margin-top: 1.6rem;
`;

const DemandsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 6px;
`;

const DemandItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: 18rem;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  & .demand_name {
    background-color: var(--color-grey-200);
    padding: 4px 0;
    border-bottom: 1px solid var(--color-grey-300);
    color: var(--color-primary);
  }

  & .demand_image {
    flex-grow: 1;
    overflow: hidden;
    img {
      aspect-ratio: 3/2;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: all 0.3s;
    }
  }

  &:hover {
    & .demand_image {
      img {
        scale: 1.1;
      }
    }
  }
`;

interface IProps {
  demands: Array<IDemand>;
}

export default function ProductDemandsLayout({ demands }: IProps) {
  return (
    <ProductDemandsLayoutStyled>
      <Heading $as='h4'>Chọn theo tiêu chí:</Heading>
      <DemandsBox>
        {demands.map((demand) => (
          <DemandItem key={demand._id}>
            <div className='demand_name'>
              <Heading $as='h5'>{demand?.demand_name}</Heading>
            </div>
            <div className='demand_image'>
              <img src={demand?.demand_image} alt={demand?.demand_name} />
            </div>
          </DemandItem>
        ))}
      </DemandsBox>
    </ProductDemandsLayoutStyled>
  );
}
