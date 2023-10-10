
import styled from 'styled-components'
const ContainerLogout =styled.div`
    margin-top: 1rem;
    text-align:center;
    font-size: 20px;
    background-color: whitesmoke;
    border: 1px solid silver;
    width: max-content;
    padding: 1rem;
    border-radius: 10px;
    div{
        margin-top: 2rem;
    }
`

const ButtonOutline = styled.button`
    color: black;
    padding: .7rem 9rem;
    background-color: silver;
    border: none;
    border-radius: 10px;
    margin-right: 1rem ;
    font-size: 20px;
`
const ButtonRed = styled.button`
color: white;
background-color: red;
padding: .7rem 9rem;
border: none;
border-radius: 10px;
font-size: 20px;
`
export default function Logout() {
  return (
    <ContainerLogout>
        <span>Bạn muốn thoát tài khoản?</span>
        <div>
            <ButtonOutline type="submit">Không</ButtonOutline>
            <ButtonRed type="submit">Đồng Ý</ButtonRed>
        </div>
    </ContainerLogout>
  )
}
