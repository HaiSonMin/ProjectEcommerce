import IHealthyAccessory from "./healthy.interface";
import IBeautifyAccessory from "./beautify.interface";

export default interface IHealthyBeatify
  extends IHealthyAccessory,
    IBeautifyAccessory {}
