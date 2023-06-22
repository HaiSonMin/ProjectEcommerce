import HeaderBanner from "./HeaderBanner";
import HeaderNavTop from "./HeaderNavTop";
import HeaderNavMain from "./HeaderNavMain";

export default function Header() {
  return (
    <div className="w-screen">
      <HeaderBanner />
      <HeaderNavTop />
      <hr />
      <HeaderNavMain />
    </div>
  );
}
