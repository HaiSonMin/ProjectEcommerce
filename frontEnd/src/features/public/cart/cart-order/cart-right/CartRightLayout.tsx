import { useRef } from "react";
import styled from "styled-components";
import CustomerInfo from "./customer-info";
import { useForm } from "react-hook-form";
import { Button, Form } from "@/components/shared";
import FormOfReceipt from "./form-of-receipt";
import BillCompany from "./bill-company";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

const CartRightLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  padding: 1.5rem 2rem 4rem;
  align-self: baseline;

  .box--captcha {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }

  .box-btn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

interface FormCustomerCart {
  sex: string;
  city: string;
  note?: string;
  address: string;
  district: string;
  fullName: string;
  phoneNumber: string;
  formOfReceipt: string;
}

export default function CartRightLayout() {
  const refCaptcha = useRef<ReCAPTCHA>(null);
  const { register, watch, handleSubmit, formState } =
    useForm<FormCustomerCart>();

  const { errors: errorsForm } = formState;

  const onSubmit = (dataForm: FormCustomerCart) => {
    const tokenReCaptcha = refCaptcha?.current?.getValue();
    if (!tokenReCaptcha) return toast.error("Hãy vui lòng xác thực Captcha");
  };

  return (
    <CartRightLayoutStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomerInfo
          register={register}
          errorsForm={errorsForm}
          watch={watch}
        />
        <FormOfReceipt />
        <BillCompany />
        <div className="box--captcha">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
            size="normal"
            ref={refCaptcha}
          />
        </div>
        <Button>Tiếp tục</Button>
      </form>
    </CartRightLayoutStyled>
  );
}
