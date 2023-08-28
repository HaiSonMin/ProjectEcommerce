import { VALUE_CONSTANT } from "@/constant";
import { formatDistanceFromNow } from "@/utils";
import { format } from "date-fns";
import { styled } from "styled-components";
const ProductRatedTopStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CustomerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & span {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-text);
  }
`;
const CustomerLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  height: 2.4rem;
  width: 2.4rem;
  border: 1px solid var(--color-grey-3d00);
  border-radius: 4px;
  background-color: var(--color-grey-300);
`;

const TimelineRated = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

export default function ProductRatedTop({ customerName, timelineRated }) {
  const timeDifference =
    new Date().getTime() - new Date(timelineRated).getTime();

  return (
    <ProductRatedTopStyled>
      <CustomerBox>
        <CustomerLogo>{String(customerName[0]).toUpperCase()}</CustomerLogo>
        <span>{customerName}</span>
      </CustomerBox>
      <TimelineRated>
        {timeDifference > VALUE_CONSTANT.TIME_ONE_DAY * 7
          ? format(new Date(timelineRated), "dd/MM/yyyy HH:mm")
          : formatDistanceFromNow(timelineRated)}
      </TimelineRated>
    </ProductRatedTopStyled>
  );
}
