const lodash = require("lodash");
const JWT = require("jsonwebtoken");
const { Types } = require("mongoose");
const { cloudinary } = require("../configs");
const otpGenerator = require("otp-generator");
const passwordGenerator = require("generate-password");
// Lodash
const getInfoData = (object = {}, field = []) => lodash.pick(object, field);
const setDataNested = (data, obj = {}) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const targetKey = key.replace(/\[(\d+)\]/g, "[$1]");
      lodash.set(data, targetKey, obj[key]);
    }
  }
  return data;
};

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
  });

const convertToMongoObjectId = (id) => new Types.ObjectId(id);

const convertFieldsToArray = (fields) => fields && fields.split(",");

// ["A","B","C"] => {A:1, B:1, C:1}
const getSelectData = (select = []) =>
  Object.fromEntries(select.map((el) => [el, 1]));

// ["A","B","C"] => {A:0, B:0, C:0}
const getUnSelectData = (select = []) =>
  Object.fromEntries(select.map((el) => [el, 0]));

const skipPage = ({ page = 1, limit = 10 }) => (+page - 1) * +limit;

// [_id, asc] => {_id:1}, [name, asc] => {name:1},
const convertSortBy = (sort = "ctime") => {
  return {
    ...Object.fromEntries(
      sort.split(",").map((el) => {
        if (el === "ctime") return ["_id", -1];
        else if (el.split("-")[1] === "asc") return [el.split("-")[0], 1];
        else return [el.split("-")[0], -1];
      })
    ),
    _id: 1,
  };
};

const excludeFields = () => ["sort", "limit", "page", "filter"];

const getOptionsOperator = (options = []) => options;

// Not Nested
const convertOperatorObject = ({ fields = [], numericFilters = "" }) => {
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
    if (fields.includes(field)) queryObject[field] = { [operator]: +value };
  });
  return queryObject;
};

const capitalizeFirstLetter = (inputString) => {
  return inputString
    .toLowerCase()
    .replace(/^(.)|\s+(.)/g, (match) => match.toUpperCase());
};

const uploadOneImage = (fieldName) => cloudinary.single(fieldName);
const uploadMultiImages = (fieldName, maxCount) =>
  cloudinary.array(fieldName, maxCount);
const uploadMultiFieldsImages = (fields) => cloudinary.any(fields);
const uploadMultiFieldsImagesDynamic = () => cloudinary.any();

const getImagesPath = (images) => images.map((img) => img.path);

const getFieldsPath = (fieldsImage = []) => {
  let fields = {};
  for (const item of fieldsImage) {
    if (!fields[item.fieldname]) fields[item.fieldname] = [item.path];
    else fields[item.fieldname].push(item.path);
  }
  return fields;
};

const getMiliSecondFormSecond = (second) => second * 1000;

const generatePassword = () =>
  passwordGenerator.generate({
    length: 10,
    numbers: true,
  });

const generatorOTP = async () =>
  await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

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
  uploadMultiFieldsImagesDynamic,
  getImagesPath,
  getFieldsPath,
  capitalizeFirstLetter,
  setDataNested,
  getMiliSecondFormSecond,
  generatorOTP,
  generatePassword,
};
