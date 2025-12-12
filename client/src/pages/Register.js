import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/InputForm.js";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import Spinner from "../components/shared/Spinner.js";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please provide all fields ");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Registered Sucessfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details.Please Tryagain");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </>
  );
};

export default Register;
