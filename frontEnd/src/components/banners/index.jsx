import BannerMain from "./BannerMain";
import BannerSub from "./BannerSub";

export default function Banner() {
  return (
    <div className="flex gap-5">
      <BannerMain />
      <BannerSub />
    </div>
  );
}
