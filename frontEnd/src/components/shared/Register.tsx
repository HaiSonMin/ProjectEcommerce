import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ImgLogo = styled.img`
  width: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 700px;
  padding-top: 25px;
  font-size:18px;
  left: 0px;
  border: none;
  border-radius: 5px;
  border-bottom: solid 1px #F0F0F0;
  &:focus {
    border-color: red;
    border-bottom: solid 2px red;
    outline: none;
  }
`;

const Label = styled.label<{ focused: boolean; hasValue: boolean }>`
  position: absolute;
  width:max-content;
  left: 0px;
  top: ${(props) => (props.focused || props.hasValue ? '0' : '19px')};
  font-size: ${(props) => (props.focused || props.hasValue ? '14px' : '18px')};
  color: ${(props) => (props.focused ? 'red' : 'inherit')};
  transition: top 0.3s, font-size 0.3s;
`;
const Pnote = styled.p`
  margin:5px 0;
  font-size:12px;
  color:silver;
  font-style:italic;
  text-align:left;
`; 
const ShowPasswordButton = styled.button<{ showPassword: boolean }>`
  position: absolute;
  right: 0px;
  top: 35%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.showPassword ? 'red' : 'inherit')};
`;

const TitleForget = styled.p`
  text-align: right;
`;

const SubmitButton = styled.button`
  width: 700px;
  margin: 1rem;
  padding: 10px 20px;
  font-size:18px;
  background-color: red;
  color: var(--color-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;
const Container = styled.div`
  margin-bottom: 20px;
  align-items: center;
`;
const HrText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  & hr {
    flex-grow: 1;
    background-color: #ccc;
    margin: 2rem 0;
  }
`;
const BottomText = styled.h3`
  text-decoration: underline;
  color:red;
`;
const GoogleZalo = styled.h4`
  
`;
const DoYouKwonAccout = styled.div`
  display:flex; 
  text-align: center;
  justify-content:center;
  gap:10px;
`;
const useInputWithLabelEffect = () => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = (value: string) => {
    setFocused(false);
    setHasValue(value.trim() !== '');
  };

  return { focused, hasValue, handleInputFocus, handleInputBlur };
};

const Register: React.FC = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false); // State để kiểm tra xác nhận mật khẩu
// hieu ung blur 
  const usernameInput = useInputWithLabelEffect();
  const passwordInput = useInputWithLabelEffect();
  const emailInput = useInputWithLabelEffect();
  const phoneNumberInput = useInputWithLabelEffect();
  const confirmPasswordInput = useInputWithLabelEffect();
  const promoCodeInput = useInputWithLabelEffect();
//Xu Ly Mat Khau 
const handlePasswordCorrect = (value) => {
  // Kiểm tra mật khẩu ngay khi dữ liệu thay đổi
  if (value && value.length >= 8) {
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
    setPasswordValid(isPasswordValid);
    // Kiểm tra xác nhận mật khẩu
    if (isPasswordValid) {
      // Nếu mật khẩu hợp lệ, kiểm tra xác nhận mật khẩu
      if (passwordValue === confirmPassword) {
        setConfirmPasswordValid(true);
        console.log("Mật khẩu đúng.");
      } else {
        setConfirmPasswordValid(false);
        console.log("Mật khẩu xác nhận không khớp.");
      }
    } else {
      // Nếu mật khẩu không hợp lệ, đặt lại trạng thái xác nhận mật khẩu
      setConfirmPasswordValid(false);
      alert("mat khau khong dungg yeu cau")
    }
    }
};
const handleConfirmPasswordChange = (value: string) => {
  if (value === passwordValue) {
    setConfirmPasswordValid(true);
  } else {
    setConfirmPasswordValid(false);
  }
};
//Xy ly Xac Nhap Mat Khau 

  return (
    <LoginContainer>
      <Title>Đăng ký Smember</Title>
      <ImgLogo
        src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
        alt="logoLogin"
      />
      <Form>
        <InputContainer>
          <Input
            type="text"
            id="username"
            required
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          onFocus={usernameInput.handleInputFocus}
          onBlur={() => usernameInput.handleInputBlur(usernameValue)}
          />

          <Label htmlFor="username" focused={usernameInput.focused} hasValue={usernameInput.hasValue}>
            Nhập họ và tên 
          </Label>
        </InputContainer>
        <InputContainer>
          <Input
            type="tel"
            id="phoneNumber"
            required
            value={phoneNumber} // Gán giá trị từ state vào input
            onChange={(e) => {
              // Sử dụng regex để loại bỏ các ký tự không phải số
              const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
              setPhoneNumber(sanitizedValue);
            }}
            onFocus={phoneNumberInput.handleInputFocus}
            onBlur={() => phoneNumberInput.handleInputBlur(phoneNumber)}
            
          />
          <Label htmlFor="phoneNumber" focused={phoneNumberInput.focused} hasValue={phoneNumberInput.hasValue}>
            Nhập số điện thoại
          </Label>
        </InputContainer>
        <InputContainer>
          <Input
            type="email"
            id="email"
            required
            value={emailValue} // Gán giá trị từ state vào input
            onChange={(e) => setEmailValue(e.target.value)} // Cập nhật giá trị vào state khi input thay đổi
            onFocus={emailInput.handleInputFocus}
            onBlur={() => emailInput.handleInputBlur(emailValue)}
          />
          <Label htmlFor="email" focused={emailInput.focused} hasValue={emailInput.hasValue}>
            Nhập email 
          </Label>
          <Pnote>(*)Hóa đơn VAT khi mua hàng sẽ được gửi về email này </Pnote>
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            id="password"
            required
            value={passwordValue} // Gán giá trị từ state vào input
            onChange={(e) => {
              const value = e.target.value;
              setPasswordValue(value);
              handlePasswordCorrect(value);

            }} // Cập nhật giá trị vào state khi input thay đổi
            onFocus={passwordInput.handleInputFocus}
            onBlur={() => passwordInput.handleInputBlur(passwordValue)}
          />
          <Label htmlFor="password" focused={passwordInput.focused} hasValue={passwordInput.hasValue}>
            Nhập mật khẩu 
          </Label>
      
          <Pnote>
              Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt
          </Pnote>
          

        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            id="confirmPassword"
            required
            value={confirmPassword} // Gán giá trị từ state vào input
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              handleConfirmPasswordChange(value); 
              // mat khau test Abc@1234
            }}
            onFocus={confirmPasswordInput.handleInputFocus}
            onBlur={() => confirmPasswordInput.handleInputBlur(confirmPassword)}
          />
          <Label htmlFor="confirmPassword" focused={confirmPasswordInput.focused} hasValue={confirmPasswordInput.hasValue}>
            Nhập nhập lại mật khẩu
          </Label>
          {(confirmPasswordValid === false && confirmPassword.length > 0)  && ( // Hiển thị chỉ khi confirmPasswordValid là false
            <Pnote style={{ color: 'red' }}>Mật khẩu xác nhận không khớp.</Pnote>
          )}
          {confirmPasswordValid === true && confirmPassword.length > 0 && ( // Hiển thị chỉ khi confirmPasswordValid là true
            <Pnote style={{ color: 'green' }}>Mật khẩu xác nhận khớp.</Pnote>
          )}
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            id="promoCode"
            required
            value={promoCode} // Gán giá trị từ state vào input
            onChange={(e) => setPromoCode(e.target.value)} // Cập nhật giá trị vào state khi input thay đổi
            onFocus={promoCodeInput.handleInputFocus}
            onBlur={() => promoCodeInput.handleInputBlur(promoCode)}
          />
          <Label htmlFor="promoCode" focused={promoCodeInput.focused} hasValue={promoCodeInput.hasValue}>
            Nhập mã giới thiệu (nếu có) 
          </Label>
        </InputContainer>
        
        <Container>
          <SubmitButton type="submit">Đăng Ký</SubmitButton>
          <HrText>
            <hr />
            hoặc đăng nhập bằng
            <hr />
          </HrText>
          <GoogleZalo>google | Zalo</GoogleZalo>
        </Container> 
      </Form>
      <DoYouKwonAccout>
       <p style={{color:'silver'}}>Bạn chưa có tài khoản?</p> <p style={{color:'red'}}>Đăng ký ngay</p>
      </DoYouKwonAccout>
      
      
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      
    </LoginContainer>
  );
};

export default Register;
