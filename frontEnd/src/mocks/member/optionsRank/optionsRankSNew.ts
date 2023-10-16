import Wallet from "@/assets/icons/member/rank/wallet.png";
import Shopping from "@/assets/icons/member/rank/shopping.png";
import Service from "@/assets/icons/member/rank/service.png";
import Discount from "@/assets/icons/member/rank/discount.png";
import FixPhone from "@/assets/icons/member/rank/fixphone.png";
import ReturnPhone from "@/assets/icons/member/rank/return.png";
import Gift from "@/assets/icons/member/rank/gift-box.png";

const optionsRankSNew = [
  {
    icon: Wallet,
    optionName: "Điều kiện xếp hạng",
    items: [
      {
        icon: Wallet,
        name: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 đến 15 triệu đồng",
      },
    ],
  },
  {
    icon: Shopping,
    optionName: "Ưu đãi mua hàng",
    items: [
      {
        icon: Discount,
        name: "Giảm thêm 2% khi mua các sản phẩm thuộc nhóm hàng loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách",
      },
      {
        icon: Discount,
        name: "Giảm thêm 1% khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại",
      },
      {
        icon: FixPhone,
        name: "Giảm thêm 5% (tối đa 100.000đ) khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui",
      },
      {
        icon: ReturnPhone,
        name: "Giảm thêm 5% (tối đa 200.000đ) khi thực hiện thu cũ lên đời",
      },
      {
        icon: Gift,
        name: "Ưu đãi sinh nhật: Tặng phiếu mua hàng trị giá 50.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)",
      },
    ],
  },
  {
    icon: Service,
    optionName: "Chính sách phục vụ",
    items:[]
  },
];

export default optionsRankSNew;
