import IncentivesDetails from "./IncentivesDetails";
import { GiWallet } from "react-icons/gi";
import {
  BsPhoneFlip,
  BsFillGiftFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { FcTwoSmartphones } from "react-icons/fc";
export default function IncentivesDetailsOne() {
  return (
    <IncentivesDetails
      titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 đến 15 triệu đồng"
      numberA="2%"
      iconUDMHa={<BsFillCartCheckFill />}
      titleUDMHa="khi mua các sản phẩm thuộc nhóm hàng loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
      numberB="1%"
      iconUDMHb={<BsFillCartCheckFill />}
      titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
      numberC="5% (tối đa 100.000đ)"
      iconUDMHc={<BsPhoneFlip />}
      titleUDMHc="khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
      numberD="Giảm thêm 5% (tối đa 200.000đ)"
      iconUDMHd={<FcTwoSmartphones />}
      titleUDMHd="khi thực hiện thu cũ lên đời"
      iconUDMHe={<BsFillGiftFill />}
      titleUDMHe="Tặng phiếu mua hàng trị giá 50.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
      notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
              viên S-New"
    />
  );
}
