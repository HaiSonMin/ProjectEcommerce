import React from 'react'
import IncentivesDetails from './IncentivesDetails'
import {GiWallet} from 'react-icons/gi'
import { BsPhoneFlip, BsFillGiftFill,BsFillCartCheckFill } from "react-icons/bs";
import { FcTwoSmartphones } from "react-icons/fc";
export default function IncentivesDetailsTwo() {
  return (
    <IncentivesDetails
    titleDKXH="Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 15 đến 50 triệu đồng"
    numberA="0.5%"
    iconUDMHa={<GiWallet />}
    titleUDMHa="khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple Watch)"
    numberB="3%"
    iconUDMHb={<BsFillCartCheckFill />}
    titleUDMHb="khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách"
    numberC="2%"
    iconUDMHc={<BsFillCartCheckFill />}
    titleUDMHc="khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại"
    numberD="5% (tối đa 200.000đ)"
    iconUDMHd={<BsPhoneFlip />}
    titleUDMHd=" khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui"
    number_D="Giảm thêm 5% (tối đa 300.000đ)"
    iconUDMH_D={<FcTwoSmartphones />}
    titleUDMH_D="khi thực hiện thu cũ lên đời"
    iconUDMHe={<BsFillGiftFill />}
    titleUDMHe="Tặng phiếu mua hàng trị giá 200.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)"
    notIncentives="Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành
    viên Diamond-member"
    />
  )
}
