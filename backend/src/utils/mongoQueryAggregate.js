const { checkStringType } = require(".");

const convertKeyForQueryAggregate = (options = []) => {
  // DBName, fieldNameOfDB, aliasName
  const fields = options.map((option) => option.split("."));
  return fields;
};

// [_id, -1] => {_id:-1}
const convertSortByAggregate = ({ localField, sort = "ctime" }) => {
  if (sort === "ctime") return { _id: -1 };
  else
    return {
      ...Object.fromEntries(
        sort.split(",").map((el) => {
          if (localField.startsWith(sort.split("_")[0])) {
            if (el.split("-")[1] === "asc") return [el.split("-")[0], 1];
            else return [el.split("-")[0], -1];
          } else {
            console.log(`${localField}.${el.split("-")[0]}`);
            if (el.split("-")[1] === "asc")
              return [`${localField}.${el.split("-")[0]}`, 1];
            else return [`${localField}.${el.split("-")[0]}`, -1];
          }
        })
      ),
    };
};

function mongoQueryAggregate({ optionFilters = [], numericFilters = "" }) {
  /**
   * [0]: DB
   * [1]: FieldName(foreign key)
   * [2]: AliasName
   * [3]: Field We Want Looking For
   */
  const operatorMap = {
    "[gt]": "$gt",
    "[gte]": "$gte",
    "[lt]": "$lt",
    "[lte]": "$lte",
    "[eq]": "$eq",
  };
  // product_price[gt]1000 => product_price-&gt-1000,product_price-&eq-1000
  const regEx = /\b(\[gt\]|\[gte\]|\[lt\]|\[lte\]|\[eq\])\b/g;
  let filterOperator = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[`${match}`]}-`
  );
  const lookups = [];
  let $match = {};

  optionFilters.forEach((option) => {
    const lookup = {
      $lookup: {
        from: option[0], // DataBaseName
        localField: option[1], // Field of current modal
        foreignField: "_id", // id of model we need reference
        as: option[2], // alias name
      },
    };
    lookups.push(lookup); //❤️

    let tempName;
    if (filterOperator)
      filterOperator.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (option[2] === "productMainInfo") tempName = option[2].slice(0, 7);
        else tempName = option[2];
        const hasMatch = field.includes(tempName);
        if (hasMatch) {
          if (checkStringType(value) === "string") {
            console.log($match);
            $match[`${option[2]}.${field}`] = {
              $regex: value,
              $options: "i",
            };
          } else {
            if (Object.hasOwn($match, [`${option[2]}.${field}`])) {
              console.log($match[`${option[2]}.${field}`]);
              $match[`${option[2]}.${field}`] = {
                ...$match[`${option[2]}.${field}`],
                [operator]: Number(value),
              };
            } else
              $match[`${option[2]}.${field}`] = { [operator]: Number(value) };
          }
        }
      });
  });
  const matches = { $match };

  return { lookups, matches };
}

module.exports = {
  mongoQueryAggregate,
  convertSortByAggregate,
  convertKeyForQueryAggregate,
};
