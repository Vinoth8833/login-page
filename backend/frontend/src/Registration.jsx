import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const Navigate = useNavigate();
  const [underline, setUnderLine] = useState(false);
  const [error, setError] = useState(false);
  const [border, setBorder] = useState(false);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValue((pre) => ({ ...pre, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    e.preventDefault(); // Prevents the form from submitting

    // Check if any fields are empty
    if (
      value.name === "" ||
      value.email === "" ||
      value.password === "" ||
      value.rePassword === ""
    ) {
      setError(true); // Show error state if fields are empty
      console.log("Some fields are empty, data not sent.");
      return; // Stop further execution
    }

    setError(false); // No error if fields are valid
    console.log("All fields are filled, ready to send data.");

    if (value.password !== value.rePassword) {
      console.log("password incorrect");
      setValue({
        name: value.name,
        email: value.email,
        password: value.password,
        rePassword: "",
      });
      setBorder(true);
    } else {
      try {
        if (
          value.email !== null ||
          (value.email !== "" && value.name !== null) ||
          (value.name !== "" && value.password !== null) ||
          (value.password !== "" && value.rePassword !== null) ||
          value.rePassword !== ""
        ) {
          const res = await axios.post("http://localhost:3000/register", value);
          console.log(res);
          setValue({
            name: "",
            email: "",
            password: "",
            rePassword: "",
          });
          setUnderLine(true);
          Navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleOnShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      <form className="form-detail">
        <h1>Register here</h1>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          onChange={handleOnChange}
          value={value.name}
          className={underline === true ? " underline" : ""}
        />
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          onChange={handleOnChange}
          value={value.email}
          className={underline === true ? " underline" : ""}
        />
        <input
          type={show === true ? "text" : "password"}
          placeholder="Create new password"
          name="password"
          onChange={handleOnChange}
          value={value.password}
          className={underline === true ? " underline" : ""}
        />
        <i
          className={show === true ? "fa fa-eye" : "fa fa-eye-slash"}
          onClick={handleOnShow}
          aria-hidden="true"
        ></i>
        <input
          type="text"
          placeholder="Re-enter password"
          name="rePassword"
          onChange={handleOnChange}
          value={value.rePassword}
          className={
            border === true || underline === true ? "border underline" : ""
          }
        />
        {error && (
          <div>
            <span>*please enter all data</span>
            <br />
            <br />
          </div>
        )}
        <button onClick={handleOnSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Registration;
