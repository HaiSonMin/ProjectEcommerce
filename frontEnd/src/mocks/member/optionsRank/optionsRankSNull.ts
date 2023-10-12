import Wallet from "@/assets/icons/member/rank/wallet.png";
import Shopping from "@/assets/icons/member/rank/shopping.png";
import Service from "@/assets/icons/member/rank/service.png";

const optionsRankSNull = [
  {
    icon: Wallet,
    optionName: "Điều kiện xếp hạng",
    items: [
      {
        icon: Wallet,
        name: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 0 đến 3 triệu đồng",
      },
    ],
  },
  {
    icon: Shopping,
    optionName: "Ưu đãi mua hàng",
    items:[]
  },
  {
    icon: Service,
    optionName: "Chính sách phục vụ",
    items:[]
  },
];

export default optionsRankSNull;
