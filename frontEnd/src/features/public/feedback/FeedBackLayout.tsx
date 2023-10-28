import {
  Button,
  Form,
  Heading,
  Input,
  InputFileImage,
  TextArea,
} from "@/components/shared";
import InputFile from "@/components/shared/InputFile";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FeedBackLayoutStyled = styled.div`
  padding: 3rem 12rem;
  background-color: var(--color-white);
  margin: 3rem 0;
  border-radius: 2rem;
  box-shadow: var(--shadow-around);
  .heading {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .note {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    span {
      font-weight: 600;
      color: var(--color-primary);
    }
  }

  .box--form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    &-input {
      label {
        display: inline-block;
        font-size: 1.4rem;
        cursor: pointer;
        margin-bottom: 5px;
        font-weight: 600;

        span {
          color: var(--color-primary);
        }
      }
    }

    &-left {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    &-right {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .box--submit {
    p {
      font-size: 1.4rem;
      color: var(--color-grey-500);
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export default function FeedBackLayout() {
  const { formState, register, handleSubmit } = useForm();

  return (
    <FeedBackLayoutStyled>
      <Heading $as="h4" className="heading">
        Tiếp nhận góp ý và phản hồi ý kiến khiếu nại của khách hàng
      </Heading>
      <p className="note">
        Thông tin bắt buộc <span>(*)</span>
      </p>
      <form>
        <div className="box--form">
          <div className="box--form-left">
            <div className="box--form-input">
              <label htmlFor="fullName">
                Nhập họ và tên <span>(*)</span>
              </label>
              <Input placeholder="Họ và tên" id="fullName" />
            </div>
            <div className="box--form-input">
              <label htmlFor="phoneNumber">
                Nhập số điện thoại <span>(*)</span>
              </label>
              <Input placeholder="Số điện thoại" id="phoneNumber" />
            </div>
            <div className="box--form-input">
              <label htmlFor="emailAddress">
                Nhập địa chỉ email <span>(*)</span>
              </label>
              <Input placeholder="Địa chỉ email" id="emailAddress" />
            </div>
          </div>
          <div className="box--form-right">
            <div className="box--form-input">
              <label htmlFor="contentFeedback">
                Nội dung góp ý <span>(*)</span>
              </label>
              <TextArea placeholder="Nội dung góp ý" id="contentFeedback" />
            </div>
            <div className="box--form-input">
              <label htmlFor="InputFileImage">
                Tải lên biên lai, biên nhận, hình ảnh khiếu nại (nếu có)
              </label>
              <InputFile
                id="InputFileImage"
                multiple={true}
                register={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="box--submit">
          <p>
            Sự góp ý chân thành của bạn là điều kiện để chúng tôi có thể phát
            triển
          </p>
          <div className="w-fit">
            <Button>Gửi phản hồi</Button>
          </div>
        </div>
      </form>
    </FeedBackLayoutStyled>
  );
}
