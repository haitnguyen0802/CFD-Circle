import { useEffect } from "react";
import HeaderAuthen from "./HeaderAuthen";
import HeaderHamburger from "./HeaderHamburger";
import HeaderLogo from "./HeaderLogo";
import { useMainContext } from "../context/MainContext";
import { useLocation } from "react-router-dom";
import PATHS from "../../constants/paths";

const Header = () => {
  const {pathname} = useLocation();
  const { isShowNavbar, handleShowNavbar } = useMainContext();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT, PATHS.BLOG].includes(pathname)
  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if(isTransparent){
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }
    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);

  return (
    <>
      <header id="header" className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}>
        <div className="container-fluid">
          <HeaderHamburger />
          <HeaderLogo />
          <HeaderAuthen />
        </div>
      </header>
    </>
  );
};

export default Header;
