import { MdDelete } from "react-icons/md";
import { css, styled } from "styled-components";
import iconDelete from "@/assets/icons/svg/icon-delete.png";

const StyledImagesGroup = styled.div<{ $isMultiImage: boolean }>`
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
      mix-blend-mode: multiply;
      ${(props) =>
        props.$isMultiImage &&
        css`
          cursor: pointer;
          transition: all 0.3s;
        `}
    }
    ${(props) =>
      props.$isMultiImage &&
      css`
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 24px;
          height: 24px;
          background-image: url(${iconDelete});
          background-size: cover;
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
            scale: 1.1;
            transform: translate(-50%, -50%);
          }
          img {
            transform: scale(1.2);
            filter: blur(6px);
          }
        }
      `}
  }
`;

interface IProps {
  images: Array<string> | string;
  altTitle: string;
  onClick?: (img: string) => void;
}

export default function ImagesGroup(props: IProps) {
  let isisMultiImage: boolean = false;
  if (typeof props.images === "object" && props.images.length > 1)
    isisMultiImage = true;
  return (
    <StyledImagesGroup $isMultiImage={isisMultiImage}>
      {typeof props.images === "object" ? (
        props.images.map((img: string, i: number) => (
          <div key={img} onClick={() => props.onClick?.(img)}>
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
