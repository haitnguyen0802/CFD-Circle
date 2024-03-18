import { useState } from "react";

function ValidationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState({});

  const _onSubmit = (event) => {
    event.preventDefault();

    // validate
    const errorObject = {};
    if (form.name === "") {
      errorObject.name = "please input name";
    }
    if (form.email === "") {
      errorObject.email = "please input email";
    } else if (
      !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(form.email)
    ) {
      errorObject.email = "please input following email format ";
    }

    setError(errorObject);

    // handle submit
    if (Object.keys(errorObject).length > 0) {
      console.log("errorObject", errorObject);
    } else {
      // call API
      console.log(`Name: ${form.name}, Email: ${form.email}`);
    }
  };

  const _onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={_onSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={form.name} onChange={_onChange} />
        <p style={{ color: "red" }}>{error.name}</p>
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={_onChange}
        />
        <p style={{ color: "red" }}>{error.email}</p>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ValidationForm;