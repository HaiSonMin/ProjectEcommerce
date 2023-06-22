import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
export default function BannerMain() {
  return (
    <div className="flex flex-col shadow-md w-[70%] h-[400px] rounded-md overflow-hidden">
      <Carousel transition={{ duration: 0.3 }} className="w-full">
        <img
          src="https://cdn.viettablet.com/images/promo/58/iphone-he.png"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="flex gap-4  text-sm text-center">
        <Link
          to={"#"}
          className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
        >
          Xả kho bộ iPhone 12 | 13 | 14 series
        </Link>
        <Link
          to={"#"}
          className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
        >
          Kredivo Góp 0% Không Cần Trả Trước
        </Link>
        <Link
          to={"#"}
          className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
        >
          Sale Hè: Tablet Xiaomi giảm hơn 1 triệu
        </Link>
        <Link
          to={"#"}
          className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
        >
          Đại Tiệc Xiaomi: Giảm Đến 1.5 Triệu
        </Link>
        <Link
          to={"#"}
          className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
        >
          Flash Sale 1 Ngày Duy Nhất
        </Link>
      </div>
    </div>
  );

  // <Link to={"#"}>
  //   <img
  //     src="https://cdn.viettablet.com/images/promo/58/iphone-he.png"
  //     alt="Banner Main"
  //   />
  // </Link>
  // <div className="flex gap-4  text-sm text-center">
  //   <Link
  //     to={"#"}
  //     className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
  //   >
  //     Xả kho bộ iPhone 12 | 13 | 14 series
  //   </Link>
  //   <Link
  //     to={"#"}
  //     className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
  //   >
  //     Kredivo Góp 0% Không Cần Trả Trước
  //   </Link>
  //   <Link
  //     to={"#"}
  //     className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
  //   >
  //     Sale Hè: Tablet Xiaomi giảm hơn 1 triệu
  //   </Link>
  //   <Link
  //     to={"#"}
  //     className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
  //   >
  //     Đại Tiệc Xiaomi: Giảm Đến 1.5 Triệu
  //   </Link>
  //   <Link
  //     to={"#"}
  //     className="text-gray-700 pt-3 px-3 pb-2 leading-4 border-r-[1px]"
  //   >
  //     Flash Sale 1 Ngày Duy Nhất
  //   </Link> */}
  //   </div>
}
