import styled from "styled-components";

const HeadingNameRankStyled = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 5px 2rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  width: fit-content;

  .box--icon {
    width: 2rem;
    height: 2rem;

    img {
      object-fit: contain;
      object-position: center;
    }
  }

  .name--rank {
    font-weight: 500;
    color: var(--color-white);
  }
`;

interface IProps {
  icon: any;
  nameRank: string;
}

export default function HeadingNameRank({ icon, nameRank }: IProps) {
  return (
    <HeadingNameRankStyled>
      <div className="box--icon">
        <img src={icon} alt="Icon Rank" />
      </div>
      <p className="name--rank">{nameRank}</p>
    </HeadingNameRankStyled>
  );
}
