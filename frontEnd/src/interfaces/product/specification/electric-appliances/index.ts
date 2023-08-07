import IIRonAccessory from "./iron.interface";
import IWaterHeaterAccessory from "./water-heater.interface";
import IVacuumCleanerAccessory from "./vacuum-cleaner.interface";
import IHomeImprovementAccessory from "./home-improvement.interface";

export default interface IElectricAppliances
  extends IIRonAccessory,
    IWaterHeaterAccessory,
    IVacuumCleanerAccessory,
    IHomeImprovementAccessory {}
