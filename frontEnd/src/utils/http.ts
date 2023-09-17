import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
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
      },
    });

    this.instance.interceptors.response.use(
      this.handlerSuccessResponse,
      this.handlerErrorResponse
    );
  }

  private handlerSuccessResponse(response: AxiosResponse) {
    return response;
  }

  private async handlerErrorResponse(error: AxiosError) {
    return Promise.reject(error);
  }
}

export default new Http().instance;
