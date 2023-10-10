import { ArrowLeftOutlined } from "@ant-design/icons";

import styled from "styled-components";
const Container = styled.div`
  text-align: center;
  width: 80%;
  font-family: 'Times New Roman', Times, serif;
`;
const Icon = styled.div`
  position: absolute;
  font-size: 30px;
  cursor: pointer;
`;
const Flex = styled.div`
margin-top: 1rem;
  display: grid;
  justify-content: center;
  justify-items: center;
  row-gap: 1rem;
  p {
    text-align: start;
  }
`;
export default function GopYPhanHoi() {
  return (
    <Container>
      <Icon>
        <ArrowLeftOutlined />
      </Icon>
      <h1>GÓP Ý VÀ PHẢN HỒI</h1>
      <Flex>
        <img
          src="https://cellphones.com.vn/smember/_nuxt/img/1024-15361.644ed9e.png"
          alt="img-staff"
        />
        <p>
          Mời bạn đánh giá mức độ hài lòng về chương trình ưu <br /> đãi Smember
          của CellphoneS. Hãy cho chúng mình <br /> thêm góp ý để cải thiện tốt
          hơn
        </p>
      </Flex>
      {/* Add From google */}
    </Container>
  );
}
