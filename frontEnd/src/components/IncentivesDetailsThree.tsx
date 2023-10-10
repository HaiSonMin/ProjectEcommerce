import React from 'react'
import IncentivesDetails from './IncentivesDetails'
import {GiPhone} from 'react-icons/gi'
import {PiLockKeyBold} from 'react-icons/pi'
import { BsPhoneFlip, BsFillGiftFill,BsFillCartCheckFill } from "react-icons/bs";
import { FcTwoSmartphones } from "react-icons/fc";
export default function IncentivesDetailsThree() {
  return (
    <IncentivesDetails
    titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 50 triệu đồng trở lên"
              numberA="1%"
              iconUDMHa={<BsFillCartCheckFill />}
              titleUDMHa=" khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple Watch)"
              numberB="5%"
              iconUDMHb={<BsFillCartCheckFill />}
              titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
              numberC="3%"
              iconUDMHc={<BsFillCartCheckFill />}
              titleUDMHc="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
              numberD="5% (tối đa 300.000đ)"
              iconUDMHd={<BsPhoneFlip />}
              titleUDMHd=" khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
              number_D="Giảm thêm 5% (tối đa 500.000đ)"
              iconUDMH_D={<FcTwoSmartphones />}
              titleUDMH_D="khi thực hiện thu cũ lên đời"
              iconUDMHe={<BsFillGiftFill />}
              titleUDMHe="Tặng phiếu mua hàng trị giá 500.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
              iconSvip={<PiLockKeyBold />}
              titleSvip="Tham gia chương trình đặt trước sản phẩm không cần đặt cọc tiền"
              iconSupport={<GiPhone />}
              SvipPhoneNumber="Tổng đài hỗ trợ và chăm sóc đặc biệt 1800.2097"
    />
  )
}
