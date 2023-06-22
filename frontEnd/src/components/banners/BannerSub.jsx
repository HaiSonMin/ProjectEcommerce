import { Link } from "react-router-dom";
import icons from "../../utils/icons";
export default function BannerSub() {
  return (
    <div className="flex flex-col w-[30%] ">
      <Link to={"#"}>
        <img
          src="https://cdn.viettablet.com/images/promo/52/ipad-vtb-360x202.jpg"
          alt="Banner Main"
        />
      </Link>
      {/* See All Blog */}
      <div className="flex justify-between my-2">
        <h2 className="font-semibold  text-primary animate-bounce">Hot New</h2>
        <Link to={"#"} className="flex items-center text-sky-600">
          <span>See All </span>
          <icons.BsArrowRightShort />
        </Link>
      </div>
      {/* Blog */}
      <div className="flex flex-col gap-3 text-sm">
        <Link to={"#"} className="flex items-center text-gray-700 hover:text-sky-600">
          <figure className="flex items-center gap-1">
              <img
                src="https://cdn.viettablet.com/images/thumbnails/100/66/news/58/so-sanh-xiaomi-13-ultra-voi-samsung-galaxy-s23-ultra.jpg"
                alt="Blog image"
              />
            <figcaption className="leading-5">
              So sánh Xiaomi 13 Ultra với Galaxy S23 Ultra: Phiên bản nào sẽ là
              ông vua trong thế giới điện thoại Android
            </figcaption>
          </figure>
        </Link>
        <Link to={"#"} className="flex items-center text-gray-700 hover:text-sky-600">
          <figure className="flex items-center gap-1">
              <img
                src="https://cdn.viettablet.com/images/thumbnails/100/66/news/58/so-sanh-iphone-14-pro-max-voi-xiaomi-13-ultra-bia.jpg"
                alt="Blog image"
              />
            <figcaption className="leading-5">
            So sánh iPhone 14 Pro Max với Xiaomi 13 Ultra: Khi Apple Trung Quốc đối đầu với hàng real
            </figcaption>
          </figure>
        </Link>
      </div>
    </div>
  );
}
