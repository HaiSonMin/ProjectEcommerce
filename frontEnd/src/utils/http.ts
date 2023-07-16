import axios, { AxiosInstance } from "axios";
class Http {
  baseUrl: string;
  instance: AxiosInstance;
  constructor() {
    this.baseUrl = "http://localhost:9000/api/"; // http://localhost:9000/api/
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || this.baseUrl,
      timeout: 5000, // 5s
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new Http().instance;
