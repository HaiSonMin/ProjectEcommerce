import IPrinterAccessory from "./printer.interface";
import ISoftwareAccessory from "./software.interface";

export default interface IOffice
  extends IPrinterAccessory,
    ISoftwareAccessory {}
