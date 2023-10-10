import styled from "styled-components";

const Cards = styled.div`
  padding: 2rem 1rem;
  border-radius: 8px;
  text-align: center;
  width: 35%;
`;
const TitleCards = styled.div`
  div {
    display: grid;
    justify-content: center;
    gap: 1rem;
    span {
      font-size: 70px;
      border-radius: 50%;
      border: 2px solid #974343;
      border-radius: 50%;
      padding-bottom: 1rem;
      padding: .5rem 1rem;
      margin-bottom: 1rem;
    }
  }
  h3 {
    color: red;
    font-size: 23px;
    margin-bottom: 1rem;
  }
  p{
    margin-bottom: 1rem;
  }
`;
const Button = styled.button`
  background-color: white;
  color: red;
  font-size: 15px;
  border-radius: 1rem;
  padding: 1rem 3rem;
  border: none;
  font-weight: 700;
  &:hover {
    background-color: #f59292;
  }
`;
export default function Card(props: {
  Icon: any;
  Heading: string;
  Details: string;
  Color: any;
}) {
  return (
    <Cards style={{ background: `${props.Color}` }}>
      <TitleCards>
        <div>
          <span>{props.Icon}</span>
        </div>
        <h3>{props.Heading}</h3>
        <p>{props.Details}</p>
      </TitleCards>
      <Button type="submit">Xem chi tiết</Button>
    </Cards>
  );
}
