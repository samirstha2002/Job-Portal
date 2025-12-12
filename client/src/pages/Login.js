import React, { useState } from "react";
import InputForm from "../components/shared/InputForm.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import Spinner from "../components/shared/Spinner.js";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return alert("Please provide all fields ");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      console.log("Full response:", data);

      if (data.success) {
        dispatch(hideLoading());

        localStorage.setItem("token", data.token);
        toast.success("Login Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Credentials.Please Tryagain");
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
                Not a user <Link to="/register">Register</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
