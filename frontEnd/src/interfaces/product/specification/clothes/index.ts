import IDryerAccessory from "./dryer.interface";
import IWashingMachineAccessory from "./washing-machine.interface";

export default interface IClothes
  extends IDryerAccessory,
    IWashingMachineAccessory {}
