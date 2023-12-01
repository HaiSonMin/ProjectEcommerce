import Modal from '@/components/shared/Modal';
import { styled } from 'styled-components';
import ProductRatingForm from './ProductRatingForm';
import Button from '@/components/shared/Button';

const ProductRatingFormStyled = styled.div`
  margin: 1rem auto;
`;

const RatingNow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  & p {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export default function ProductRatingModal() {
  return (
    <ProductRatingFormStyled>
      <Modal>
        <RatingNow>
          <p>Hãy đánh giá sản phẩm của chúng tôi</p>
          <Modal.Open openWindowName='ratingProduct'>
            <Button>Đánh giá ngay</Button>
          </Modal.Open>
        </RatingNow>
        <Modal.Window windowName='ratingProduct'>
          <ProductRatingForm />
        </Modal.Window>
      </Modal>
    </ProductRatingFormStyled>
  );
}
