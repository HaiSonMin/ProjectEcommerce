import Heading from "@/components/shared/Heading";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AboutCartStyled = styled.div<{ $bgColorCard: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.$bgColorCard};
  padding: 3rem 0 2rem;
  border-radius: 1rem;

  .box-icon {
    width: 7rem;
    height: 7rem;

    img {
      object-fit: contain;
      object-position: center;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 2.5rem;
  margin-bottom: 4.5rem;
  text-align: center;

  .heading {
    color: var(--color-primary);
  }

  .valueCart {
    color: var(--color-grey-500);
    font-size: 1.8rem;
  }
`;

const ButtonSeeDetail = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 2rem;
  color: var(--color-primary);
  font-weight: 600;
  background-color: white;
  box-shadow: var(--shadow-md);
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;

export default function AboutCart({
  icon,
  heading,
  valueCart,
  bgColorCard,
  linkToSee,
}) {
  return (
    <AboutCartStyled $bgColorCard={bgColorCard}>
      <div className="box-icon">
        <img src={icon} alt="Icon member card" />
      </div>
      <Info>
        <Heading $as="h2" className="heading">
          {heading}
        </Heading>
        <p className="valueCart">{valueCart}</p>
      </Info>
      <ButtonSeeDetail to={linkToSee}>Xem chi tiết</ButtonSeeDetail>
    </AboutCartStyled>
  );
}
