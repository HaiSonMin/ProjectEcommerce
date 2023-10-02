import { useState } from "react";
import styled from "styled-components";
import { RiVipCrown2Fill, RiVipDiamondFill, RiVipLine } from "react-icons/ri";
import IncentivesCheckBox from "@/components/IncentivesCheckBox";
import IncentivesDetails from "@/components/IncentivesDetails";
import { GiPhone, GiWallet } from "react-icons/gi";
import Button from "@/components/Button";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "@/constant/path-router";

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
    <IncentivesDetails
      titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 đến 15 triệu đồng"
      numberA="2%"
      iconUDMHa={<GiWallet />}
      titleUDMHa="khi mua các sản phẩm thuộc nhóm hàng loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
      numberB="1%"
      iconUDMHb={<GiWallet />}
      titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
      numberC="5% (tối đa 100.000đ)"
      iconUDMHc={<GiWallet />}
      titleUDMHc="khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
      numberD="5% (tối đa 200.000đ)"
      iconUDMHd={<GiWallet />}
      titleUDMHd="khi thực hiện thu cũ lên đời"
      iconUDMHe={<GiWallet />}
      titleUDMHe="Tặng phiếu mua hàng trị giá <b> 50.000đ </b> (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
      notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
    viên S-New"
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
            <IncentivesDetails
              titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 đến 15 triệu đồng"
              numberA="2%"
              iconUDMHa={<GiWallet />}
              titleUDMHa="khi mua các sản phẩm thuộc nhóm hàng loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
              numberB="1%"
              iconUDMHb={<GiWallet />}
              titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
              numberC="5% (tối đa 100.000đ)"
              iconUDMHc={<GiWallet />}
              titleUDMHc="khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
              numberD="Giảm thêm 5% (tối đa 200.000đ)"
              iconUDMHd={<GiWallet />}
              titleUDMHd="khi thực hiện thu cũ lên đời"
              iconUDMHe={<GiWallet />}
              titleUDMHe="Tặng phiếu mua hàng trị giá <b> 50.000đ </b> (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
              notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
              viên S-New"
            />
          );
          setIsBorder(true);
          break;
        case 2:
          setDivContent(
            <IncentivesDetails
              titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 15 đến 50 triệu đồng"
              numberA="0.5%"
              iconUDMHa={<GiWallet />}
              titleUDMHa="khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple Watch)"
              numberB="3%"
              iconUDMHb={<GiWallet />}
              titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
              numberC="2%"
              iconUDMHc={<GiWallet />}
              titleUDMHc="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
              numberD="5% (tối đa 200.000đ)"
              iconUDMHd={<GiWallet />}
              titleUDMHd=" khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
              number_D="Giảm thêm 5% (tối đa 300.000đ)"
              iconUDMH_D={<GiWallet />}
              titleUDMH_D="khi thực hiện thu cũ lên đời"
              iconUDMHe={<GiWallet />}
              titleUDMHe="Tặng phiếu mua hàng trị giá 200.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
              notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
              viên Diamond-member"
            />
          );
          setIsBorder(true);
          break;
        case 3:
          setDivContent(
            <IncentivesDetails
              titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 50 triệu đồng trở lên"
              numberA="1%"
              iconUDMHa={<GiWallet />}
              titleUDMHa=" khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple Watch)"
              numberB="5%"
              iconUDMHb={<GiWallet />}
              titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
              numberC="3%"
              iconUDMHc={<GiWallet />}
              titleUDMHc="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
              numberD="5% (tối đa 300.000đ)"
              iconUDMHd={<GiWallet />}
              titleUDMHd=" khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
              number_D="Giảm thêm 5% (tối đa 500.000đ)"
              iconUDMH_D={<GiWallet />}
              titleUDMH_D="khi thực hiện thu cũ lên đời"
              iconUDMHe={<GiWallet />}
              titleUDMHe="Tặng phiếu mua hàng trị giá 500.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
              iconSvip={<GiWallet />}
              titleSvip="Tham gia chương trình đặt trước sản phẩm không cần đặt cọc tiền"
              iconSupport={<GiPhone />}
              SvipPhoneNumber="Tổng đài hỗ trợ và chăm sóc đặc biệt 1800.2097"
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
