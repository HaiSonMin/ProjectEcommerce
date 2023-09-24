import { UseAuthApi } from "@/apis-use";
import { PATH_API_V1 } from "@/constant";
import CONSTANT from "@/constant/value-constant";
import { IApi } from "@/helpers";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class Http {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || this.baseUrl,
      withCredentials: true,
      timeout: 20000, // 20s
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${localStorage.getItem(
          CONSTANT.USER_TOKEN_NAME
        )}`,
      },
    });

    this.instance.interceptors.response.use(
      this.handlerSuccessResponse,
      this.handlerErrorResponse
    );
  }
  // Process data before response to client
  private handlerSuccessResponse(response: AxiosResponse): AxiosResponse {
    const result: IApi = response.data;
    console.log("result:::", result);

    if (
      (response.config.url &&
        response.config.url.indexOf(`${PATH_API_V1.auth.feature.login}`) > 0) ||
      (response.config.url &&
        response.config.url.indexOf(
          `${PATH_API_V1.auth.feature.refreshAccessToken}`
        ) > 0) ||
      result.statusCode !== 401
    )
      return response;

    const { refreshAT } = UseAuthApi.refreshAT();
    refreshAT();
    return response;
  }

  private handlerErrorResponse(error: AxiosError) {
    return Promise.reject(error);
  }
}

export default new Http().instance;
