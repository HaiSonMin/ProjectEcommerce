import { useState } from "react";
import styled from "styled-components";
import { RiVipCrown2Fill, RiVipDiamondFill, RiVipLine } from "react-icons/ri";
import IncentivesCheckBox from "@/components/IncentivesCheckBox";
import IncentivesDetails from "@/components/IncentivesDetails";
import Button from "@/components/shared/Button";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "@/constant/path-router";
import IncentivesDetailsTwo from "@/components/IncentivesDetailsTwo";
import IncentivesDetailsOne from "@/components/IncentivesDetailsOne";
import IncentivesDetailsThree from "@/components/IncentivesDetailsThree";

const IncentivesLayoutContainer = styled.div`
  margin: 5% 20%;
  font-family: "McLaren", cursive;
`;
const IncentivesCheckboxContainer = styled.div`
  display: flex;
  gap: 10%;
  text-align: center;
  justify-content: center;
  margin-top: 2rem;
`;
const TitleRed = styled.div`
  background-color: red;
  padding: 0 1rem;
  color: white;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  text-align: center;
  justify-content: center;
  margin: 1rem 10%;
  padding: 1rem;
`;
const TextCenter = styled.div`
  text-align: center;
`;

export default function IncentivesLayout() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [divContent, setDivContent] = useState(
    <IncentivesDetailsOne
    />
  );
  const [isBorder, setIsBorder] = useState(false);

  const handleCheckboxChange = (checkboxNumber) => {
    if (selectedCheckbox === checkboxNumber) {
      setSelectedCheckbox(null);
      setDivContent(<IncentivesDetails />);
      setIsBorder(false);
    } else {
      setSelectedCheckbox(checkboxNumber);
      switch (checkboxNumber) {
        case 1:
          setDivContent(
            <IncentivesDetailsOne/>
          );
          setIsBorder(true);
          break;
        case 2:
          setDivContent(
            <IncentivesDetailsTwo/>
          );
          setIsBorder(true);
          break;
        case 3:
          setDivContent(
            <IncentivesDetailsThree
            />
          );
          setIsBorder(true);
          break;
        default:
          setIsBorder(false);
      }
    }
  };
  const borderStyles = {
    outline: "1px red solid",
    borderRadius: " 50%",
  };
  return (
    <IncentivesLayoutContainer>
      <TitleRed>
        <h2>ĐIỀU KIỆN VÀ ƯU ĐÃI CHO CÁC CẤP ĐỘ SMEMBER</h2>
      </TitleRed>
      <TextCenter>
        <p>
          {" "}
          <i>Vui lòng chọn mức dộ thành viên để xem chi tiết ưu đãi</i>
        </p>
      </TextCenter>
      <IncentivesCheckboxContainer>
        <IncentivesCheckBox
          STYLEss={
            isBorder && selectedCheckbox === 1
              ? borderStyles
              : { border: "none" }
          }
          Icons={<RiVipCrown2Fill fontSize="50" />}
          NameTag="New-member"
          Checked={selectedCheckbox === 1}
          Onclick={() => handleCheckboxChange(1)}
        />
        <IncentivesCheckBox
          STYLEss={
            isBorder && selectedCheckbox === 2
              ? borderStyles
              : { border: "none" }
          }
          Icons={<RiVipDiamondFill fontSize="50" />}
          NameTag="Diamond-member"
          Checked={selectedCheckbox === 2}
          Onclick={() => handleCheckboxChange(2)}
        />
        <IncentivesCheckBox
          STYLEss={
            isBorder && selectedCheckbox === 3
              ? borderStyles
              : { border: "none" }
          }
          Icons={<RiVipLine fontSize="50" />}
          NameTag="VIP-member"
          Checked={selectedCheckbox === 3}
          Onclick={() => handleCheckboxChange(3)}
        />
      </IncentivesCheckboxContainer>

      <div>{divContent}</div>
      <TextCenter>
        <Link to={`/${PATH_AUTH.login}`}>
          <Button> Đăng nhập/Đăng kí ngay</Button>
        </Link>
      </TextCenter>
    </IncentivesLayoutContainer>
  );
}
