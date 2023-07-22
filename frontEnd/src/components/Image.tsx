import { styled } from "styled-components";

const StyleImage = styled.div`
  grid-column: 1/-1;
  margin-top: 1rem;
  margin-bottom: 2rem;

  & div {
    position: relative;
    width: 18rem;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: var(--shadow-md);
    & img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
`;

interface IProps {
  image: string;
  altTitle: string;
}
export default function Image(props: IProps) {
  return (
    <StyleImage>
      <div>
        <img src={props.image} alt={props.altTitle} />
      </div>
    </StyleImage>
  );
}
