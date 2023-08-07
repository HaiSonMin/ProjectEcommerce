import IBlenderAccessory from "./blender.interface";
import IWaterPurifierAccessory from "./water-purifier.interface";

export default interface IWaterDrink
  extends IBlenderAccessory,
    IWaterPurifierAccessory {}
