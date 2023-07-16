import CONSTANT from "./constant";
import http from "./http";

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
  for (let item of Object.entries(args))
    formData.append(`${item[0]}`, item[1]);
  return formData;
};

export { CONSTANT, resultAppendFormData, http, getErrorMessage, sortObject };
