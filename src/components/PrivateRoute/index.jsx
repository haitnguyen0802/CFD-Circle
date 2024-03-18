import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import tokenMethod from "../../utils/token";
import { MODAL_TYPES } from "../../constants/general";

const PrivateRoute = ({redirectPath = "/"}) => {
    const {handleShowModal} = useAuthContext();
    if(!!!tokenMethod.get()){
        handleShowModal(MODAL_TYPES.login);
        return <Navigate to={redirectPath} />
    }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
