import React, { useState } from "react";
import { Menu, User, Send, Smile, Image, Plus } from "lucide-react";
import './index.css';

const EmployeeQueryPage = () => {
  // State to manage the input message and message history
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle send button click
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Add the user's message to history
      const newMessage = { sender: 'user', text: message };
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);

      // Simulate a response from the respondent after a short delay
      setTimeout(() => {
        const response = { sender: 'respondent', text: 'Thank you for your query. We are reviewing it.' };
        setMessageHistory((prevHistory) => [...prevHistory, response]);
      }, 1000); // Respond after 1 second

      setMessage(''); // Clear the message field after sending
    }
  };

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

            {/* Message Box with History (inside label) */}
            <div className="input-field">
              <label>Message:</label>
              <div className="chat-container">
                <div className="message-box">
                  {/* Display the messages within the same container */}
                  <div className="message-history">
                    {messageHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`message-bubble ${msg.sender === 'user' ? 'user' : 'respondent'}`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    rows={3}
                    className="message-input"
                  />
                </div>
              </div>
            </div>

            {/* Icon Buttons */}
            <div className="icon-buttons">
              <Plus size={24} className="icon" />
              <Image size={24} className="icon" />
              <Smile size={24} className="icon" />
            </div>

            {/* Submit Button */}
            <button
              className="submit-button"
              onClick={handleSendMessage}
            >
              <Send size={20} /> Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeQueryPage;
