import IFanAccessory from "./fan.interface";
import IAirPurifierAccessory from "./air-purifier.interface";
import IAirConditionerAccessory from "./air-conditioner.interface";

export default interface IAir
  extends IFanAccessory,
    IAirPurifierAccessory,
    IAirConditionerAccessory {}
