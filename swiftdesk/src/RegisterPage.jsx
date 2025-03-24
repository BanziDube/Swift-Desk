import React from "react";
import './ResetPassword.css';

const RegisterPage = () => {
  return (
    <div className="login">
      <div className="login__form">
        <h1 className="login__title">Swift Desk</h1>
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        <form>
          <div className="login__content">
            <div className="login__box">
              <input type="text" className="login__input" placeholder=" " required />
              <label className="login__label">Name</label>
            </div>
            <div className="login__box">
              <input type="text" className="login__input" placeholder=" " required />
              <label className="login__label">Surname</label>
            </div>
            <div className="login__box">
              <input type="email" className="login__input" placeholder=" " required />
              <label className="login__label">Email</label>
            </div>
            <div className="login__box">
              <input type="text" className="login__input" placeholder=" " required />
              <label className="login__label">Employee No</label>
            </div>
            <div className="login__box">
              <input type="text" className="login__input" placeholder=" " required />
              <label className="login__label">Employee Type</label>
            </div>
            <div className="login__box">
              <input type="password" className="login__input" placeholder=" " required />
              <label className="login__label">Create Password</label>
            </div>
            <div className="login__box">
              <input type="password" className="login__input" placeholder=" " required />
              <label className="login__label">Confirm Password</label>
            </div>
          </div>
          <button className="login__button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
