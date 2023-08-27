import { formatDistance, parseISO } from "date-fns";
import http from "./http";
import { VALUE_CONSTANT } from "@/constant";

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

const resultAppendFormData = (args: object) => {
  const formData = new FormData();
  for (let item of Object.entries(args)) {
    if (typeof item[1] === "object") {
      for (let i = 0; i < Object.keys(item[1]).length; i++) {
        formData.append(`${item[0]}`, item[1][i]);
      }
    } else formData.append(`${item[0]}`, item[1]);
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
  const sort: string =
    String(queriesString.sort) || VALUE_CONSTANT.SORT_DEFAULT;
  const page: number = Number(queriesString.page) || 1;
  const limit: number = queriesString.limit;
  const status: string = String(queriesString.status) || "all";
  const keySearch: string = String(queriesString.keySearch) || "";
  const numericFilters: string = String(queriesString.numericFilters) || "";
  return { sort, page, limit, status, keySearch, numericFilters };
};

const removeSpaceString = (str: string) => str.split(" ").join("");

function capitalizeFirstLetter(inputString: string) {
  return inputString
    .toLowerCase()
    .replace(/^(.)|\s+(.)/g, (match) => match.toUpperCase());
}

export {
  http,
  sortObject,
  formatCurrencyVND,
  formatCurrencyUSD,
  getErrorMessage,
  getQueriesString,
  getToastMessageError,
  resultAppendFormData,
  formatDistanceFromNow,
  removeSpaceString,
  capitalizeFirstLetter,
};
