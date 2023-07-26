export default interface IArgsQuery {
  sort: string;
  page: number;
  limit: number;
  status: string;
  fields: string| undefined;
  unFields: string | undefined;
  keySearch: string | undefined;
  numericFilters: string | undefined;
}
