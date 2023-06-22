import { Link } from "react-router-dom";
import { navMain } from "../../utils/constant";
import icons from "../../utils/icons";
export default function HeaderNavMain() {
  return (
    <div className="w-full bg-primary py-2">
      <div className="w-desktop m-auto flex justify-around items-center py-1">
        {navMain.map((item) => {
          return (
            <Link
              to={item.path}
              className="flex gap-1 items-center text-white"
              key={item.id}
            >
              <i>
                {item.value === "Phone" && <icons.HiOutlineDevicePhoneMobile />}
                {item.value === "Laptop" && <icons.IoIosLaptop />}
                {item.value === "Tablet" && <icons.HiOutlineDeviceTablet />}
                {item.value === "Accessory" && <icons.BsHeadphones />}
                {item.value === "Smartwatch" && <icons.CgAppleWatch />}
                {item.value === "OldProduct" && <icons.MdOutlinePhoneAndroid />}
                {item.value === "PC" && <icons.AiOutlineWindows />}
                {item.value === "TIVI" && <icons.SlScreenDesktop />}
              </i>
              <span>{item.value}</span>
              <icons.BiDownArrow className="mt-[2px] text-sm" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
