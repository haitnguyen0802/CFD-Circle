import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { REGEX } from "../../constants/regex";
import { message } from "antd";
import ComponentLoading from "../ComponentLoading";
import { MODAL_TYPES } from "../../constants/general";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import Button from "../Button";
import Input from "../Input";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal } = useAuthContext();
  const {handleRegister} = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const _onSubmit = (e) => {
    e.preventDefault();

    const errorObject = {}

    if (!!!form.email) {
      errorObject.name = "Vui lòng nhập họ và tên";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập Email";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng Email";
    }

    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập mật khẩu";
    }

    if (!!!form.confirmPassword) {
      errorObject.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (form.password && form.confirmPassword !== form.password) {
      errorObject.confirmPassword = "Mật khẩu xác nhận không đúng";
    }

    setError(errorObject);

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit Success", form);
      handleRegister({...form}, () => {
        setTimeout(() => {
          setLoading(false);
          message.success("Đăng ký thành công");
          handleCloseModal();
        }, 300);
      })
    }
  };
  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPES.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      {/* <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng ký bằng Google</span>
        </a>
      </div>
      <span className="line">Hoặc</span> */}
      <form onSubmit={_onSubmit} className="form">
        <Input
          label="Họ và Tên"
          placeholder="Họ và Tên"
          required
          {...register("name")}
        />
        <Input
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Mật Khẩu"
          placeholder="Mật Khẩu"
          required
          {...register("password")}
        />
        <Input
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          required
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
