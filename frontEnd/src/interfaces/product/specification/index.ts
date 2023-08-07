import IAir from "./air";
import ISound from "./sound";
import IOffice from "./office";
import ICabinet from "./cabinet";
import IClothes from "./clothes";
import ICooking from "./cooking";
import IAccessory from "./accessories";
import ITechnology from "./technology";
import IWaterDrink from "./water-drink";
import IHealthyBeatify from "./healthy-beautify";
import IElectricAppliances from "./electric-appliances";

export default interface ISpecification
  extends IAir,
    ISound,
    IOffice,
    ICabinet,
    IClothes,
    ICooking,
    IAccessory,
    ITechnology,
    IWaterDrink,
    IHealthyBeatify,
    IElectricAppliances {}
