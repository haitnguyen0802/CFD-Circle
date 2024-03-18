import { Outlet } from "react-router-dom";
import AuthModal from "../../components/AuthModal";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Overlay from "../../components/Overlay";
import Header from "../../components/Header";
import PageLoading from "../../components/PageLoading";
import MainContextProvider from "../../components/context/MainContext";
import AuthContextProvider from "../../components/context/AuthContext";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        {/* Page Loading */}
        <PageLoading />

        {/* Header */}
        <Header />

        {/* Navigation Bar */}
        <NavBar />

        {/* Overlay */}
        <Overlay />

        {/* Routing */}
        <Outlet />

        {/* Footer */}
        <Footer />

        {/* Modal Đăng Nhập / Đăng Ký */}
        <AuthModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
