import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    employeeNo: "",
    employeeType: "employee", // Default set to 'employee'
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmployeeTypeChange = (e) => {
    setFormData({ ...formData, employeeType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save user data to Firestore
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          employeeType: formData.employeeType,
          name: formData.name,
          surname: formData.surname,
          employeeNo: formData.employeeNo,
        });

        alert("Registration Successful!");
      })
      .catch((error) => {
        alert("Registration failed: " + error.message);
      });
  };

  return (
    <div className="login">
      <img src="login-bg.png" alt="" className="login__img" />
      <form onSubmit={handleSubmit} className="register__form">
        <h1 className="login__title">Register</h1>

        <div className="login__content">
          <div className="login__box">
            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                placeholder=""
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label className="login__label">Name</label>
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                placeholder=""
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              <label className="login__label">Surname</label>
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                placeholder=""
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label className="login__label">Email</label>
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                placeholder=""
                name="employeeNo"
                value={formData.employeeNo}
                onChange={handleChange}
              />
              <label className="login__label">Employee No</label>
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                placeholder=""
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label className="login__label">Create Password</label>
            </div>
          </div>

          <div className="login__box">
            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                placeholder=""
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label className="login__label">Confirm Password</label>
            </div>
          </div>

          {/* Employee Type Dropdown */}
          <div className="login__box">
            <select
              className="login__input"
              name="employeeType"
              value={formData.employeeType}
              onChange={handleEmployeeTypeChange}
              required
            >
               <option value="">Employee Type</option>
               <option value="employee">Employee</option> 
               <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button type="submit" className="login__button">
          Register
        </button>

        <p className="login__register">
            Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
