import IKitchenToolAccessory from "./kitchen-tool.interface";
import IKitchenUtensilAccessory from "./kitchen-utensil.interface";

export default interface ICooking
  extends IKitchenToolAccessory,
    IKitchenUtensilAccessory {}
