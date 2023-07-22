const lodash = require("lodash");
const JWT = require("jsonwebtoken");
const { Types } = require("mongoose");
const { cloudinary } = require("../configs");
// Lodash
const getInfoData = (object = {}, field = []) => lodash.pick(object, field);

function checkStringType(inputString) {
  if (/^\d+$/.test(inputString)) {
    return "number";
  } else {
    return "string";
  }
}

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

const skipPage = ({ page, limit }) => (+page - 1) * +limit;

// [_id, -1] => {_id:-1}
const convertSortBy = (sort) =>
  sort &&
  Object.fromEntries(
    sort.split(",").map((el) => {
      if (el === "ctime") return ["_id", -1];
      else if (el.split("-")[1] === "asc") return [el.split("-")[0], 1];
      else return [el.split("-")[0], -1];
    })
  );

const excludeFields = () => ["sort", "limit", "page", "filter"];

const getOptionsOperator = (options = []) => options;

// Not Nested
const convertOperatorObject = ({ options = [], numericFilters = "" }) => {
  const queryObject = {};

  const operatorMap = {
    "[gt]": "$gt",
    "[gte]": "$gte",
    "[lt]": "$lt",
    "[lte]": "$lte",
    "[eq]": "$eq",
  };
  // product_price[gt]1000 => product_price-&gt-1000
  const regEx = /\b(\[gt\]|\[gte\]|\[lt\]|\[lte\]|\[eq\])\b/g;
  let filterOperator = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[`${match}`]}-`
  );

  filterOperator.split(",").forEach((item) => {
    // [product_price , $gt , 1000]
    const [field, operator, value] = item.split("-");
    if (options.includes(field)) queryObject[field] = { [operator]: +value };
  });
  return queryObject;
};
// Have Nested
// const convertOperatorObject = ({ options = [], numericFilters = "" }) => {
//   const queryObject = {};

//   const operatorMap = {
//     "[gt]": "$gt",
//     "[gte]": "$gte",
//     "[lt]": "$lt",
//     "[lte]": "$lte",
//     "[eq]": "$eq",
//   };
//   // product_price[gt]1000 => product_price-&gt-1000
//   const regEx = /\b(\[gt\]|\[gte\]|\[lt\]|\[lte\]|\[eq\])\b/g;
//   let filterOperator = numericFilters.replace(
//     regEx,
//     (match) => `-${operatorMap[`${match}`]}-`
//   );

//   if (filterOperator)
//     filterOperator.split(",").forEach((item) => {
//       // [product_price , $gt , 1000]
//       const [field, operator, value] = item.split("-");
//       const fieldExecute = options.find((option) => option.includes(field));
//       console.log(fieldExecute);
//       if (fieldExecute) queryObject[fieldExecute] = { [operator]: +value };
//     });
//   console.log("queryObject::::", queryObject);
//   return queryObject;
// };

const uploadOneImage = (fieldName) => cloudinary.single(fieldName);
const uploadMultiImages = (fieldName, maxCount) =>
  cloudinary.array(fieldName, maxCount);
const uploadMultiFieldsImages = (fields) => cloudinary.fields(fields);

const getImagesPath = (images) => images.map((img) => img.path);

const getFieldsPath = (fieldsImage = []) => {
  let fieldsPath = {};
  for (const [keys, value] of Object.entries(fieldsImage)) {
    fieldsPath[keys] = value.map((v) => v.path);
  }
  // [{key:value}, {key:value}]
  return fieldsPath;
};

module.exports = {
  checkStringType,
  skipPage,
  convertSortBy,
  getInfoData,
  getSelectData,
  getUnSelectData,
  verifyToken,
  saveTokenCookie,
  deleteTokenCookie,
  excludeFields,
  getOptionsOperator,
  convertOperatorObject,
  convertToMongoObjectId,
  convertFieldsToArray,
  uploadOneImage,
  uploadMultiImages,
  uploadMultiFieldsImages,
  getImagesPath,
  getFieldsPath,
};
