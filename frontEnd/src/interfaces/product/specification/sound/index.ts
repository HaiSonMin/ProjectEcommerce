import ILoudSpeakerAccessory from "./loud-speaker.interface";
import IBluetoothSpeakerAccessory from "./bluetooth-speaker.interface";

export default interface ISound
  extends ILoudSpeakerAccessory,
    IBluetoothSpeakerAccessory {}
