import {
  FaRegEye,
  FaSortAmountDown,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdFiberNew } from "react-icons/md";

const SORT_CONSTANTS = [
  {
    label: "Ra mắt (new)",
    value: "product_release-desc",
    icon: <MdFiberNew />,
  },
  {
    label: "Cao đến thấp",
    value: "product_price-desc",
    icon: <FaSortAmountDown />,
  },
  {
    label: "Thấp đến cao",
    value: "product_price-asc",
    icon: <FaSortAmountDownAlt />,
  },
  {
    label: "Siêu giảm giá",
    value: "product_discount-desc",
    icon: <HiOutlineReceiptPercent />,
  },
  {
    label: "Xem nhiều",
    value: "product_view-desc",
    icon: <FaRegEye />,
  },
];

export default SORT_CONSTANTS;
