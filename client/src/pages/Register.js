import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/shared/InputForm.js";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const [values, setValues] = useState({
  //     name: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //   });

  //hndkle inputs
  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     setValues({
  //       ...values,
  //       [e.target.name]: value,
  //     });
  //   };

  // form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(name, lastName, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="card p-2" onSubmit={handleSubmit}>
          <img
            src="/assets/images/logo/logo.png"
            alt="logo"
            height={150}
            width={400}
          />
          <InputForm
            htmlFor="name"
            labelText={"Name"}
            type={"text"}
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <InputForm
            htmlFor="name"
            labelText={"LastName"}
            type={"text"}
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <InputForm
            htmlFor="email"
            labelText={"Email"}
            type={"email"}
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <InputForm
            htmlFor="password"
            labelText={"Password"}
            type={"password"}
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex justify-content-between">
            <p>
              Already Registered <Link to="/login">Login</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
