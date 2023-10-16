import { Button, Input } from "@/components";
import styled from "styled-components";

const ContainerCheckingOrder = styled.div`
  margin: 5% 0;
`;
const Grid = styled.div`
  background-color: #f5f5f5;
  border-radius: 15px;
  margin: 0 auto;
  max-width: 800px;
  overflow: hidden;
  position: relative;
`;
const Item1 = styled.div`
  display: flex;
`;
const ImgContainer = styled.div`
  left: 0;
    position: absolute;
    top: 50px;
    z-index: 1;
`;
const Item2 = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-left: auto;
  padding: 10px 20px;
  text-align: right;
  width: 60%;
`;
const BoxRed = styled.div`
  background: linear-gradient(to bottom right, #fd2424 37%, #f5f5f5 70%);
  height: 800px;
  left: -571px;
  opacity: 0.6;
  position: absolute;
  top: -300px;
  transform: rotate(55deg);
  width: 800px;
  z-index: 0;
`;
const ImgChecking = styled.img`
  height: 200px;
  max-width: 100%;
  margin-left: 10rem;
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: auto;
  row-gap: 1rem;
  justify-items: center;
  input {
    width: 80%;
    color: silver;
  }
  button {
    width: max-content;
  }
`;
const Hr = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  gap: 8px;
  hr {
    border: 1px solid silver;
    width: 140px;
  }
`;
export default function CheckingOrderLayout() {
  return (
    <ContainerCheckingOrder>
      <Grid>
        <Item2>
          <p>Kiểm tra thông tin đơn hàng & tình trạng vận chuyển</p>
          <GridBox>
            <Input type="text" value="Số điện thoại (bắt buộc)" />
            <Input type="text" value="Mã đơn hàng (bắt buộc)" />
            <Button>Kiểm Tra</Button>
            <Hr>
              <hr />
              <p>hoặc</p>
              <hr />
            </Hr>
            <Button>Đăng nhập để tra cứu thuận tiện hơn</Button>
          </GridBox>
        </Item2>
        <Item1>
          <ImgContainer>
            <ImgChecking
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/wysiwyg/Shipper2.png"
              alt="logo-shipper"
            />
          </ImgContainer>
          <BoxRed></BoxRed>
        </Item1>
      </Grid>
    </ContainerCheckingOrder>
  );
}
