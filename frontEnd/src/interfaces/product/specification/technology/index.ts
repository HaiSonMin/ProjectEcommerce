import ITiviAccessory from "./tivi.interface";
import IPhoneAccessory from "./phone.interface";
import IWatchAccessory from "./watch.interface";
import ICameraAccessory from "./camera.interface";
import ILaptopAccessory from "./laptop.interface";
import ITabletAccessory from "./tablet.interface";

export default interface ITechnology
  extends ITiviAccessory,
    IPhoneAccessory,
    IWatchAccessory,
    ICameraAccessory,
    ILaptopAccessory,
    ITabletAccessory {}
