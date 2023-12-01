import Collapses from '@/components/shared/Collapsed';
import Heading from '@/components/shared/Heading';
import { TbMessageQuestion } from 'react-icons/tb';
import { styled } from 'styled-components';

const FrequentlyAskedQuestionsLayoutStyled = styled.div`
  box-shadow: var(--shadow-around);
  border-radius: 1rem;
  padding: 1rem 1rem 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: var(--color-primary);

  svg {
    width: 2rem;
    height: 2rem;
  }

  .heading {
    color: var(--color-primary);
    text-transform: uppercase;
  }
`;

const Body = styled.div``;

const itemsTest = [
  {
    id: '1',
    label: 'Hiệu năng Iphone có gì nổi bật?',
    content:
      'Vào năm 2021, Apple đã mang đến cho người dùng 5 sự lựa chọn màu sắc trên iPhone 13 gồm: trắng, xanh dương, hồng, đen và đỏ. Sau đó vào tháng 3/2022, Apple tiếp tục cho ra mắt phiên bản màu xanh lá độc đáo.',
  },
  {
    id: '2',
    label: 'Có hổ trơ esim không?',
    content:
      'Vào năm 2021, Apple đã mang đến cho người dùng 5 sự lựa chọn màu sắc trên iPhone 13 gồm: trắng, xanh dương, hồng, đen và đỏ. Sau đó vào tháng 3/2022, Apple tiếp tục cho ra mắt phiên bản màu xanh lá độc đáo.',
  },
  {
    id: '3',
    label: 'Iphone có mấy màu',
    content:
      'Vào năm 2021, Apple đã mang đến cho người dùng 5 sự lựa chọn màu sắc trên iPhone 13 gồm: trắng, xanh dương, hồng, đen và đỏ. Sau đó vào tháng 3/2022, Apple tiếp tục cho ra mắt phiên bản màu xanh lá độc đáo.',
  },
];

export default function FrequentlyAskedQuestionsLayout() {
  return (
    <FrequentlyAskedQuestionsLayoutStyled>
      <Header>
        <Heading $as='h3' className='heading'>
          Câu hỏi thường gặp
        </Heading>
        <TbMessageQuestion />
      </Header>
      <Body>
        {itemsTest.map((item) => (
          <Collapses title={item.label}>{item.content}</Collapses>
        ))}
      </Body>
    </FrequentlyAskedQuestionsLayoutStyled>
  );
}
