interface IInfoAddress {
  name: string;
  code: number;
  codename: string;
}

export interface ICity extends IInfoAddress {}

export interface IDistrict extends IInfoAddress {
  districts: Array<IInfoAddress>;
}

export interface IWard extends IInfoAddress {
  wards: Array<IInfoAddress>;
}
