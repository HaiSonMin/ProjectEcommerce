import { Link } from "react-router-dom";
import logoShipping from "../../assets/images/footerLogoShipping.png";
import logoReturnGoods from "../../assets/images/footterLogoReturnGoods.png";
import logoBestPrice from "../../assets/images/footerLogoBestPrice.png";
import logoWarranty from "../../assets/images/footerLogoWarranty.png";
import {
  footerInformationAndPolicy,
  footerServiceAndOrder,
  footerConnectWithShop,
  footerPaymentMethod,
  footerSupportSwitchboard,
} from "../../utils/constant";
export default function Footer() {
  return (
    <footer className="w-screen pt-5 pb-10 flex flex-col items-center">
      {/* Banner footer */}
      <div className=" bg-primary w-full font-semibold text-lg text-white py-4  ">
        <div className="w-desktop flex justify-around m-auto">
          <figure className="flex flex-col gap-2 items-center">
            <img
              src={logoShipping}
              alt="Logo Shipping"
              className="w-12 h-8 object-contain"
            />
            <figcaption>Nationwide shipping</figcaption>
          </figure>
          <figure className="flex flex-col gap-2 items-center">
            <img
              src={logoReturnGoods}
              alt="Logo Shipping"
              className="w-12 h-8 object-contain"
            />
            <figcaption>1 for 1 in 30 days</figcaption>
          </figure>
          <figure className="flex flex-col gap-2 items-center">
            <img
              src={logoBestPrice}
              alt="Logo Shipping"
              className="w-12 h-8 object-contain"
            />
            <figcaption>Standard price</figcaption>
          </figure>
          <figure className="flex flex-col gap-2 items-center">
            <img
              src={logoWarranty}
              alt="Logo Shipping"
              className="w-12 h-8 object-contain"
            />
            <figcaption>12 months warranty</figcaption>
          </figure>
        </div>
      </div>

      {/* Contact */}
      <div className="hidden py-5 w-desktop sm:grid lg:grid-cols-12 gap-2 md:grid-cols-2 sm:grid-cols-1 ">
        {/* Support and Payment */}
        <div className="col-span-3">
          <h3 className="text-lg mb-1">Free Support Hotline</h3>
          <div className="flex flex-col gap-1 child:ml-2">
            {footerSupportSwitchboard.map((item) => (
              <div key={item.id} className="flex gap-1 ">
                <span className="text-sm  text-gray-600 tracking-tight">
                  {item.value}:
                </span>
                <Link to="tel:0877778287" className="font-semibold text-sm">
                  {item.phone}
                </Link>
                <span className="text-sm  text-gray-600 tracking-tight">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <h3 className="text-lg mb-1">Payment Methods</h3>
            <div className="flex flex-row flex-wrap gap-3 ml-2">
              {footerPaymentMethod.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="inline-block w-[15%] h-10 border"
                >
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-full h-full shadow-md rounded-sm object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Information and Policy*/}
        <div className="col-span-3">
          <h3 className="text-lg mb-1">Information And Policy</h3>
          <ui className="list-none child:ml-2 child:text-gray-600 hover:child:text-black hover:child:font-semibold">
            {footerInformationAndPolicy.map((item) => (
              <li key={item.id}>
                <Link to={item.path} className="text-sm">
                  {item.value}
                </Link>
              </li>
            ))}
          </ui>
        </div>
        {/* Service and Other Information */}
        <div className="col-span-3">
          <h3 className="text-lg mb-1">Services and other information</h3>
          <ui className="list-none child:ml-2 child:text-gray-600 hover:child:text-black hover:child:font-semibold">
            {footerServiceAndOrder.map((item) => (
              <li key={item.id}>
                <Link to={item.path} className="text-sm">
                  {item.value}
                </Link>
              </li>
            ))}
          </ui>
        </div>
        {/* Connect with shop */}
        <div className="col-span-3">
          <h3 className="text-lg mb-1">Contact us</h3>
          <ui className="list-none child:ml-2 child:flex child:items-center child:gap-1 ">
            {footerConnectWithShop.map((item) => (
              <li key={item.id}>
                {item.value}:
                <Link to={item.path} className="text-gray-600 text-sm">
                  <img src={item.image} alt={item.value} />
                </Link>
              </li>
            ))}
          </ui>
        </div>
      </div>
      {/* Certified Image  */}
      <div className="w-full pt-4 pb-6 bg-stone-100 ">
        <div className="w-desktop flex flex-col items-center m-auto text-center">
          <p className="text-xs">
            Hai Son Technical Service and Trading Company Limited- Business
            license: 0316172372 issued at the Department of Planning and
            Investment of Ho Chi Minh City. HCM. Office address: 350-352 Vo Van
            Kiet, Co Giang Ward, District 1, Ho Chi Minh City, Vietnam. Phone:
            034.529.9087
          </p>
          <div className="flex gap-2 mt-2">
            <img
              src="https://www.viettablet.com/images/bocongthuong.png"
              alt="certified image of the Ministry of Industry and Trade"
              className="w-32 object-contain"
            />
            <img
              src="https://images.dmca.com/Badges/dmca_copyright_protected150c.png?ID=158f5667-cce3-4a18-b2d1-826225e6b022"
              alt="certified image of the Ministry of Industry and Trade"
              className="w-32 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
