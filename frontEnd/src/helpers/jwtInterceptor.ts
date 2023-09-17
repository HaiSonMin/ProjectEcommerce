import { http } from "@/utils";

// Check before send response to client
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error) console.log("error:::", error);
  }
);
