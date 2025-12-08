import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="form-container">
        <form className="card p-4 shadow" style={{ width: "380px" }}>
          <img
            src="/assets/images/logo/logo.png"
            alt="logo"
            height={150}
            width={400}
          />
          <div className="mb-1 ">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-1 ">
            <label htmlFor="name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-1 ">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

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
