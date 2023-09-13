import React, { useState } from 'react';
import styled from 'styled-components';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'; // Import React Icons

const LoginContainer = styled.div`
  background-color: #fff;
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
  width: 500px;
  padding-top: 25px;
  font-size:18px;
  left: 0px;
  border: none;
  border-radius: 5px;
  border-bottom: solid 1px silver;
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
  width:  500px;
  padding: 10px 20px;
  font-size:18px;
  background-color: red;
  color: #fff;
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
const Login: React.FC = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [usernameHasValue, setUsernameHasValue] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordHasValue, setPasswordHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
    setUsernameHasValue(usernameValue.trim() !== '');
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    setPasswordHasValue(passwordValue.trim() !== '');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? 'password' : 'text');
  };

  
  return (
    <LoginContainer>
      <Title>Đăng nhập Smember</Title>
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
            value={usernameValue} // Gán giá trị từ state vào input
            onChange={(e) => setUsernameValue(e.target.value)} // Cập nhật giá trị vào state khi input thay đổi
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
          />
          <Label htmlFor="username" focused={usernameFocused} hasValue={usernameHasValue}>
            Nhập số điện thoại/email
          </Label>
        </InputContainer>
        <InputContainer>
          <Input
            type={passwordInputType}
            id="password"
            required
            value={passwordValue} // Gán giá trị từ state vào input
            onChange={(e) => setPasswordValue(e.target.value)} // Cập nhật giá trị vào state khi input thay đổi
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
          <Label htmlFor="password" focused={passwordFocused} hasValue={passwordHasValue}>
            Nhập mật khẩu
          </Label>
          <ShowPasswordButton type="button" onClick={toggleShowPassword} showPassword={showPassword}>
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </ShowPasswordButton>
          <TitleForget>Quen mat khau?</TitleForget>
        </InputContainer>
        
        <Container>
          <SubmitButton type="submit">Đăng nhập</SubmitButton>
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
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
      
    </LoginContainer>
  );
};

export default Login;
