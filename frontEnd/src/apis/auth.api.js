import { axios } from "../config";

export default class AuthApi {
  static async getCategories() {
    return axios({
      baseURL: "/",
      method: "GET",
    });
  }
}
