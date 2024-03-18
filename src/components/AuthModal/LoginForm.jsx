import React, { forwardRef, useEffect, useRef, useState } from "react";
import { MODAL_TYPES } from "../../constants/general";
import { REGEX } from "../../constants/regex";
import Button from "../Button";
import ComponentLoading from "../ComponentLoading";
import Input from "../Input";
import { useAuthContext } from "../context/AuthContext";


const LoginForm = () => {
  const { handleShowModal, handleCloseModal } = useAuthContext();
  const {handleLogin} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  // const focusRef = useRef();
  // function focusTextInut() {
  //   focusRef.current.focus();
  // }
  // useEffect(() => {
  //   focusTextInut();
  // }, [])

  const inputFocus = useRef();
  function focusInputText() {
    inputFocus.current.focus();
  }
  useEffect(() => {
    focusInputText()
  }, [])
  
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

    const errorObject = {};

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập Email";
    } else if (!REGEX["email"].test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.password) {
      errorObject.password = "Vui lòng nhập mật khẩu";
    }

    setError(errorObject);

    if (Object.keys(errorObject)?.length > 0) {
      console.log("Submit error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      handleLogin?.({...form}, () => {
        setTimeout(() => {
        setLoading(false);
        // message.success("Đăng nhập thành công");
          // handleCloseModal();
        }, 300);
      })
    }
  };
  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
      
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      {/* <div className="social">
        <a className="btn btn--google" href="#">
          <i>
            <img src="img/icon-google.svg" alt="Google CFD" />
          </i>
          <span>Đăng nhập bằng Google</span>
        </a>
        <a className="btn btn--facebook" href="#">
          <i>
            <img src="img/icon-facebook-v2.svg" alt="Google CFD" />
          </i>
          <span>Đăng nhập bằng Google</span>
        </a>
      </div> */}
      <form onSubmit={_onSubmit} className="form">
        <Input
          // ref={focusRef}
          ref={inputFocus}
          label="Email"
          placeholder="Email"
          required
          {...register("email")}
        />
        <Input
          label="Password"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <Button className="form__btn-register" type="submit">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
