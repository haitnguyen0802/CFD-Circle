import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const MainConText = createContext({});

const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsShowNavbar(false);
  }, [pathname]);
  const handleShowNavbar = (isShow) => {
    setIsShowNavbar(isShow);
  };

  return (
    <MainConText.Provider value={{ isShowNavbar, handleShowNavbar }}>
      {children}
    </MainConText.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainConText);
