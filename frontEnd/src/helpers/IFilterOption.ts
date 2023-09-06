export interface IFilterItem {
  id: string;
  itemName: string;
  itemInfo: string;
}

export interface IFilterOption {
  id: string;
  filterOption: string;
  filterOptionInfo: string;
  filterItems: Array<IFilterItem>;
}
