import { styled } from "styled-components";

const StyledImagesGroup = styled.div`
  grid-column: 1/-1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
      object-fit: fill;
      cursor: pointer;
      transition: all 0.3s;
    }

    &::after {
      position: absolute;
      display: block;
      content: "delete";
      top: 50%;
      left: 50%;
      transform: translate(-50%, 4rem);
      color: red;
      font-size: 1.6rem;
      font-weight: 700;
      transition: all 0.3s;
      cursor: pointer;
      opacity: 0;
    }

    &:hover {
      &::after {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      img {
        transform: scale(1.2);
        filter: blur(6px);
      }
    }
  }
`;

interface IProps {
  images: Array<string> | string;
  altTitle: string;
  onClick?: (img: string) => void;
  //   onClick: any;
}

export default function ImagesGroup(props: IProps) {
  return (
    <StyledImagesGroup>
      {typeof props.images === "object" ? (
        props.images.map((img: string, i: number) => (
          <div key={img} onClick={() => props.onClick(img)}>
            <img src={img} alt={`${props.altTitle} ${i}`} />
          </div>
        ))
      ) : (
        <div>
          <img src={props.images} alt={`${props.altTitle}`} />
        </div>
      )}
    </StyledImagesGroup>
  );
}
