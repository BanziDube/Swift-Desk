import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "./firebase"; // Import Firebase auth and Firestore
import "./resetPassword.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    employeeNo: "",
    employeeType: "user", // Default selection
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmployeeTypeChange = (e) => {
    setFormData({ ...formData, employeeType: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Firebase authentication to register the user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        surname: formData.surname,
        email: user.email,
        employeeNo: formData.employeeNo,
        employeeType: formData.employeeType, // Save role (admin or user)
      });

      alert("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">Swift Desk</h1>
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="login__content">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Surname", name: "surname", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Employee No", name: "employeeNo", type: "text" },
              { label: "Create Password", name: "password", type: "password" },
              { label: "Confirm Password", name: "confirmPassword", type: "password" },
            ].map((field, index) => (
              <div className="login__box" key={index}>
                <input
                  type={field.type}
                  className="login__input"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
                <label className="login__label">{field.label}</label>
              </div>
            ))}

            {/* Employee Type Dropdown */}
            <div className="login__box">
              <select
                className="login__input"
                name="employeeType"
                value={formData.employeeType}
                onChange={handleEmployeeTypeChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="login__button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
