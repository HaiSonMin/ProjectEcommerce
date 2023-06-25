const lodash = require("lodash");
const JWT = require("jsonwebtoken");
const { Types } = require("mongoose");
// Lodash
const getInfoData = (object = {}, field = []) => lodash.pick(object, field);

// Token
const verifyToken = ({ token, key }) => JWT.verify(token, key);
const saveTokenCookie = ({ tokenName, tokenValue, day, res }) =>
  res.cookie(tokenName, tokenValue, {
    httpOnly: true,
    maxAge: day * 24 * 60 * 60 * 1000,
  });
const deleteTokenCookie = ({ tokenName, res }) =>
  res.clearCookie(tokenName, {
    httpOnly: true,
    secure: true,
  });
const convertToMongoObjectId = (id) => new Types.ObjectId(id);

const convertFieldsToArray = (fields) => fields && fields.split(",");

// ["A","B","C"] => {A:1, B:1, C:1}
const getSelectData = (select = []) =>
  Object.fromEntries(select.map((el) => [el, 1]));

// ["A","B","C"] => {A:0, B:0, C:0}
const getUnSelectData = (select = []) =>
  Object.fromEntries(select.map((el) => [el, 0]));

const skipPage = ({ page, limit }) => (page - 1) * limit;

// [_id, -1] => {_id:-1}
const convertSortBy = (sort) =>
  sort &&
  Object.fromEntries(
    sort.split(",").map((el) => {
      if (el === "ctime") return ["_id", -1];
      else if (el.startsWith("-")) return [el.slice(1), -1];
      else return [el, 1];
    })
  );

const excludeFields = () => ["sort", "limit", "page", "filter"];

const getOptionOperator = (option = []) => option;

const convertOperatorObject = ({ option = [], numericFilters = "" }) => {
  const queryObject = {};

  const operatorMap = {
    "[gt]": "$gt",
    "[gte]": "$gte",
    "[lt]": "$lt",
    "[lte]": "$lte",
    "[eq]": "$eq",
  };
  const regEx = /\b(\[gt\]|\[gte\]|\[lt\]|\[lte\]|\[eq\])\b/g;
  let filterOperator = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[`${match}`]}-`
  );
  console.log("filterOperator:::", filterOperator);
  filterOperator.split(",").forEach((item) => {
    const [field, operator, value] = item.split("-");
    if (option.includes(field)) queryObject[field] = { [operator]: +value };
  });
  return queryObject;
};

module.exports = {
  skipPage,
  convertSortBy,
  getInfoData,
  getSelectData,
  getUnSelectData,
  verifyToken,
  saveTokenCookie,
  deleteTokenCookie,
  excludeFields,
  getOptionOperator,
  convertOperatorObject,
  convertToMongoObjectId,
  convertFieldsToArray,
};
