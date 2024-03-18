import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";

const ContactForm = ({ handleFormSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    content: "",
  });

  const [error, setError] = useState({});

  // const _onChange = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;

  //   setForm({ ...form, [name]: value });
  // };

  const _onSubmit = (event) => {
    event.preventDefault();

    // start validate
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập tên";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }

    if (!!!form.topic) {
      errorObject.topic = "Vui lòng chọn topic";
    }

    if (!!!form.content) {
      errorObject.content = "Vui lòng nhập nội dung";
    }
    // end validate

    setError(errorObject);

    // handle submit
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit error", errorObject);
    } else {
      // call API
      
      console.log("Submit success", form);
    }
  };

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };
  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        {...register("name")}
      />
      <Input
        label="Email"
        required
        placeholder="Email"
        {...register("email")}
      />
      <Input
        label="Số điện thoại"
        required
        placeholder="Số điện thoại"
        {...register("phone")}
      />
      <Input
        label="Chủ đề cần hỗ trợ"
        required
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJs" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
        {...register("topic")}
      />
      <Input
        label="Nội dung"
        required
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
        {...register("content")}
      />
      <div className="btncontrol">
        <Button onClick={_onSubmit}>Gửi</Button>
      </div>
    </div>
  );
};

export default ContactForm;
