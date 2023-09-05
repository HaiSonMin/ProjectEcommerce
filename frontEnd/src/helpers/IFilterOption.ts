export default interface IFilterOption {
  id: string;
  filterOption: string;
  filterOptionInfo: string;
  filterItems: Array<{ id: string; itemName: string; itemInfo: string }>;
}
