import IPcAccessory from "./pc-accessory.interface";
import ITiviAccessory from "./tivi-accessory.interface";
import IAppleAccessory from "./apple-accessory.interface";
import IPhoneAccessory from "./phone-accessory.interface";
import ILaptopAccessory from "./laptop-accessory.interface";

export default interface IAccessory
  extends IAppleAccessory,
    ILaptopAccessory,
    IPcAccessory,
    IPhoneAccessory,
    ITiviAccessory {}
