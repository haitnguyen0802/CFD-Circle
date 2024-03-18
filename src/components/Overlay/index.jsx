import { useMainContext } from "../context/MainContext";

const Overlay = () => {
  const { isShowNavbar, handleShowNavbar } = useMainContext();
  return (
    <div
      className={`${!!isShowNavbar ? "overlay" : ""}`}
      onClick={() => {
        handleShowNavbar(false);
      }}
    />
  );
};

export default Overlay;
