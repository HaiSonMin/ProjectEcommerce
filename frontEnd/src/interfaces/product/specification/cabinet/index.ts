import IFridgeAccessory from "./fridge.interface";
import IFreezerAccessory from "./freezer.interface";
import IRefrigerationAccessory from "./refrigeration.interface";

export default interface ICabinet
  extends IFridgeAccessory,
    IFreezerAccessory,
    IRefrigerationAccessory {}
