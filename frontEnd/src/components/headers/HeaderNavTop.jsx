import { Link } from "react-router-dom";
import logo from "../../assets/images/logoweb.png";
import icons from "../../utils/icons";
import PATH from "../../utils/path";
export default function HeaderNavTop() {
  return (
    <div className="w-full bg-primary py-2">
      <div className="w-desktop m-auto flex justify-between items-center py-1">
        <Link to={PATH.HOME}>
          <img src={logo} alt="Logo Shop Phone" className="w-[200px]" />
        </Link>
        <div className="flex gap-6 items-center">
          {/* Search Input */}
          <div className="w-[400px]">
            <div className="relative flex items-center w-full h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pl-3"
                type="text"
                id="search"
                placeholder="Search product"
              />
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer hover:text-gray-400 duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Call */}
          <Link
            to="tel:+345299087"
            className="flex gap-1 items-center text-white "
          >
            <icons.BsTelephone className="text-lg" />
            <div className="flex flex-col items-center">
              <span>0345.299.087</span>
              <span>Call To By</span>
            </div>
          </Link>
          {/* Order */}
          <Link to="/order" className="flex flex-col items-center text-white ">
            <icons.LuPackageSearch />
            <span>Order Lookup</span>
          </Link>
          {/* Order */}
          <Link to="/mycart" className="flex flex-col items-center text-white ">
            <icons.BsCart3 />
            <span>My Cart</span>
          </Link>
          <Link
            to="wishlist"
            className="flex flex-col items-center text-white "
          >
            <icons.AiOutlineHeart />
            <span>Wishlist</span>
          </Link>
          <Link to="login" className="flex flex-col items-center text-white ">
            <icons.FaUserAltSlash />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
