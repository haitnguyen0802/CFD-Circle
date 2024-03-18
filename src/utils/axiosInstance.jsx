// utils/axiosInstance
import axios from "axios";
import { BASE_URL } from "../constants/environments";
import tokenMethod from "./token";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error", error);
    const originalRequest = error.config;

    //Nếu mã lỗi là 403 hoặc 401 và request không chứa key _retry
    if (
      (error.response?.status === 403 || error?.response.status === 401) &&
      !!!originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Gọi API để cập nhật Token mới.
        const res = await axiosInstance.put("/customer/refresh", {
          refreshToken: tokenMethod.get()?.refreshToken,
        });
        const { token: accessToken, refreshToken } = res.data.data || {};

        //Lưu lại token mới vào Local hoặc cookies
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        //Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        //Gọi lại yêu cầu nan đầu với token mới
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);

        //Xử lý lỗi nếu không thể cập nhật Token mới.
        tokenMethod.remove();
      }
    }

    //Nếu lỗi không phải là 403 hoặc 401, trả về lỗi ban đầu
    return Promise.reject(error);
  }
);

//Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ sever
axiosInstance.interceptors.request.use(
  (config) => {
    //Xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
