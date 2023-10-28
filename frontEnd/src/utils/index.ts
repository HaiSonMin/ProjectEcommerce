import http from "./http";
import { v4 as uuidv4 } from "uuid";
import { WEB_STORE_NAME, VALUE_CONSTANT } from "@/constant";
import { formatDistance, parseISO } from "date-fns";
import { IProductOption } from "@/interfaces/shared";

const getErrorMessage = (err: any): string => err.response.data.message;

const sortObject = ({ data, sortValue }) => {
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedData = data?.toSorted(
    (a: string | number, b: string | number) => {
      if (typeof a[field] === "number" && typeof b[field] === "number")
        return (a[field] - b[field]) * modifier;
      if (typeof a[field] === "string" && typeof b[field] === "string")
        return a[field].localeCompare(b[field]) * modifier;
    }
  );
  return sortedData;
};

const getATLocalStorage = () => {
  const data = localStorage.getItem(WEB_STORE_NAME.AT_NAME_LOCAL_STORE);
  if (data) return JSON.parse(data).token;
  return null;
};

const resultAppendFormData = (args: object) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(args)) {
    if (typeof value === "object") {
      for (let i = 0; i < Object.keys(value).length; i++) {
        formData.append(key, value[i]);
      }
    } else formData.append(key, value);
  }
  return formData;
};

const duplicateObject = (object: IProductOption): IProductOption => {
  for (const key in object) {
    if (typeof object[key] === "object")
      object[key] = duplicateObject(object[key]);
    else if (key === "id") object[key] = randomKey();
  }
  return object;
};

const resultAppendFormDataRecursive = (
  args: Record<string, any>,
  formData: FormData = new FormData(),
  prefix: string = ""
): FormData => {
  for (const [key, value] of Object.entries(args)) {
    const fieldName: string = prefix ? `${prefix}[${key}]` : key;
    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(fieldName, value[i]);
      }
    } else if (typeof value === "object") {
      resultAppendFormDataRecursive(value, formData, fieldName);
    } else formData.append(fieldName, value);
  }
  return formData;
};
const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

const formatCurrencyVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

const formatCurrencyUSD = (value: number) =>
  new Intl.NumberFormat("es", {
    style: "currency",
    currency: "USD",
  }).format(value);

const getToastMessageError = (errMessage: string) => {
  if (errMessage.includes("duplicate")) {
    const i1 = errMessage.indexOf("{ ");
    const i2 = errMessage.indexOf("}");
    const tempStr = errMessage.slice(i1 + 1, i2);
    const messageError = `Duplicate${tempStr}`;
    return messageError;
  }
  return errMessage;
};

const getQueriesString = (queriesString: any) => {
  const sort: string = queriesString.sort || VALUE_CONSTANT.SORT_DEFAULT;
  const page: number = queriesString.page || 1;
  const limit: number = queriesString.limit;
  const status: string = queriesString.status || "all";
  const keySearch: string = queriesString.keySearch || "";
  const numericFilters: string = queriesString.numericFilters || "";
  return { sort, page, limit, status, keySearch, numericFilters };
};

const removeSpaceString = (str: string) => str.split(" ").join("");

function capitalizeFirstLetter(inputString: string) {
  return inputString
    .toLowerCase()
    .replace(/^(.)|\s+(.)/g, (match) => match.toUpperCase());
}

const randomKey = (): string => uuidv4();

export {
  http,
  randomKey,
  sortObject,
  getErrorMessage,
  duplicateObject,
  getATLocalStorage,
  getQueriesString,
  formatCurrencyVND,
  formatCurrencyUSD,
  removeSpaceString,
  getToastMessageError,
  resultAppendFormData,
  formatDistanceFromNow,
  capitalizeFirstLetter,
  resultAppendFormDataRecursive,
};
