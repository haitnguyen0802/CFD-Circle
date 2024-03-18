import { createContext, useContext, useEffect, useState } from "react";
import tokenMethod from "../../utils/token";
import { authService } from "../../services/AuthService";
import { message } from "antd";
import { orderService } from "../../services/OrderService";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState();
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()) {
      setShowedModal(modalType || "");
    }
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);

  const handleLogin = async (loginData, callback) => {
    //Call API
    try {
      const res = await authService.login(loginData);
      const { token: accessToken, refreshToken } = res?.data?.data || {};

      //Lưu vào LocalStorage
      tokenMethod.set({
        accessToken,
        refreshToken,
      });

      if (!!tokenMethod) {
        //Lấy thông tin profile
        handleGetProfile();
        //Thông báo
        message.success("Đăng nhập thành công");

        //Đóng modal
        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại");
    } finally {
      callback?.();
    }
  };

  const handleRegister = async (registerData, callback) => {
    try {
      const { name, email, password } = registerData;
      const payload = {
        firstName: name,
        lastName: "",
        email,
        password,
      };
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        handleLogin({
          email,
          password,
        });
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };
  const handleLogout = () => {
    tokenMethod.remove();
    setProfile(undefined);
  };
  const handleGetProfile = async () => {
    try {
      const profileRes = await authService.getProfile();
      if (profileRes?.data?.data) {
        setProfile(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };
  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
    } catch (error) {
      console.log("getCourseHistories error", error);
    }
  };
  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(payments);
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };
  const handleUpdateProfile = async (profileData) => {
    try {
      const {
        firstName,
        email,
        password,
        facebookURL,
        introduce,
        phone,
        website,
      } = profileData;
      const payload = {
        firstName: firstName,
        lastName: "",
        email,
        password,
        facebookURL,
        website,
        introduce,
        phone,
      };
      const res = await authService.updateProfile(payload);
      if (res?.data?.data?.id) {
        message.success("Cập nhật thông tin thành công.");
        handleGetProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        showedModal,
        courseInfo,
        profile,
        paymentInfo,
        handleCloseModal,
        handleShowModal,
        handleGetProfileCourse,
        handleGetProfilePayment,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
