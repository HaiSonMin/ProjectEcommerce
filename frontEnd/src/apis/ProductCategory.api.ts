import { ITypeProductCategoryResultGetAll } from "apiTypes/IProductCategoryResultApi";
import { ProductCategoryType } from "../featureTypes";
import { TypeArgsQuery } from "../helpers/TypeArgsQuery";
import { CONSTANT, http, resultAppendFormData } from "../utils";
import { TypeApi } from "helpers/TypeApi";

class ProductCategoryApi {
  async createProductCategory(args: Omit<ProductCategoryType, "_id">) {
    try {
      const response = await http.postForm(
        `${CONSTANT.PATH_V1_API.productCategory}/create`,
        resultAppendFormData(args)
      );
      const result: TypeApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllProductCategory(
    fieldsQuery: Omit<TypeArgsQuery, "unFields" | "numericFilters">
  ) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.productCategory}/getAll`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
            fields: fieldsQuery.fields,
          },
        }
      );
      const result: ITypeProductCategoryResultGetAll = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategory(args: ProductCategoryType) {
    try {
      const response = await http.patchForm(
        `v1/productCategory/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: TypeApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteProductCategory(arg: Pick<ProductCategoryType, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.productCategory}/delete/${arg._id}`
      );
      const result: TypeApi = response.data;
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new ProductCategoryApi();
