import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import {
  RatingStarAction,
  InputFile,
  Heading,
  TextArea,
  Button,
} from "@/components/shared";

const IMG =
  " https://cdn2.cellphones.com.vn/150x150,webp,q100/media/wysiwyg/cps-ant-review.png";

const ProductRatingFormStyled = styled.div`
  width: 50rem;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
const From = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function ProductRatingForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {};
  return (
    <ProductRatingFormStyled>
      <Header>
        <img src={IMG} alt="Image rating" />
        <Heading $as="h4">Đánh giá và nhận xét sản phẩm XXX</Heading>
      </Header>
      <From onSubmit={handleSubmit(onSubmit)}>
        <InputFile id="image-rating" />
        <TextArea placeholder="Cảm nhận về sản phẩm" />
        <RatingStarAction ratingPoint={3} />
        <Button type="submit">Gửi đánh giá</Button>
      </From>
    </ProductRatingFormStyled>
  );
}
