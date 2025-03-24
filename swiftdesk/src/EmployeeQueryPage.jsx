import React from "react";
import { Menu, User, Send, Smile, Image, Plus } from "lucide-react";
import './index.css';

const EmployeeQueryPage = () => {
  return (
    <div className="employee-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <User size={32} className="mt-4" />
        <div className="mt-6 flex flex-col gap-4">
          <div className="icon">💬</div>
         
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Swift Desk</h1>
          <Menu size={28} className="menu-icon" />
        </header>

        {/* Employee Form */}
        <section className="employee-form-container">
          <div className="employee-form">
            <h2>Employee Query</h2>
            <div className="input-field">
              <label>Select Query Type:</label>
              <input type="text" placeholder="Enter query type" />
            </div>
            <div className="input-field">
              <label>Select Priority Level:</label>
              <input type="text" placeholder="Enter priority" />
            </div>
            <div className="input-field">
              <label>Message:</label>
              <textarea placeholder="Type your message here"></textarea>
            </div>

            {/* Icon Buttons */}
            <div className="icon-buttons">
              <Plus size={24} className="icon" />
              <Image size={24} className="icon" />
              <Smile size={24} className="icon" />
            </div>

            {/* Submit Button */}
            <button className="submit-button">
              <Send size={20} /> Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeQueryPage;
