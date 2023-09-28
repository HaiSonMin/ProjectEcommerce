import { format } from "date-fns";
import { styled } from "styled-components";
import { VALUE_CONSTANT } from "@/constant";
import { formatDistanceFromNow } from "@/utils";
import { MdAdminPanelSettings } from "react-icons/md";
const AnswerTopAdminStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & span {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-primary);
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
  border-radius: 4px;
  background-color: var(--color-primary);

  & svg {
    color: #fff;
    width: 2rem;
    height: 2rem;
  }
`;

const TimelineRated = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

export default function AnswerTopAdmin({ customerName, timelineAnswer }) {
  const timeDifference =
    new Date().getTime() - new Date(timelineAnswer).getTime();

  return (
    <AnswerTopAdminStyled>
      <CustomerBox>
        <CustomerLogo>
          <MdAdminPanelSettings />
        </CustomerLogo>
        <span>{customerName}</span>
      </CustomerBox>
      <TimelineRated>
        {timeDifference > VALUE_CONSTANT.TIME_ONE_DAY * 7
          ? format(new Date(timelineAnswer), "dd/MM/yyyy HH:mm")
          : formatDistanceFromNow(timelineAnswer)}
      </TimelineRated>
    </AnswerTopAdminStyled>
  );
}
