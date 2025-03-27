import React, { useState } from "react";
import { FaUserCircle, FaComments, FaTachometerAlt, FaHistory, FaInfoCircle } from "react-icons/fa";
import "./technicianPanel.css";

const TechnicianPanel = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="technician-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <FaUserCircle size={30} className="sidebar-icon mb-6 cursor-pointer" title="Profile" onClick={() => setSelectedTab("profile")} />
        <FaTachometerAlt size={30} className="sidebar-icon mb-6 cursor-pointer" title="Dashboard" onClick={() => setSelectedTab("dashboard")} />
        <FaHistory size={30} className="sidebar-icon mb-6 cursor-pointer" title="Ticket History" onClick={() => setSelectedTab("history")} />
        <FaComments size={30} className="sidebar-icon mb-6 cursor-pointer" title="Messages" onClick={() => setSelectedTab("messages")} />
        <FaInfoCircle size={30} className="sidebar-icon mb-6 cursor-pointer" title="Help & Support" onClick={() => setSelectedTab("help")} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {selectedTab === "dashboard" ? <Dashboard /> : null}
        {selectedTab === "messages" ? <Messages setActiveChat={setActiveChat} /> : null}
        {selectedTab === "profile" ? <Profile /> : null}
        {selectedTab === "history" ? <TicketHistory /> : null}
        {selectedTab === "help" ? <HelpSupport /> : null}
        {activeChat && <ChatWindow user={activeChat} onClose={() => setActiveChat(null)} />}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>
      <p>Summary of received queries today...</p>
      <div className="dashboard-summary">
        <div className="stat-box">
          <h3>Tickets Resolved</h3>
          <p>50/100</p>
        </div>
        <div className="stat-box">
          <h3>Tickets Open</h3>
          <p>30</p>
        </div>
      </div>
    </div>
  );
};

const Messages = ({ setActiveChat }) => {
  const queries = [
    { id: 1, user: "John Doe", issue: "Cannot connect to VPN", timestamp: "10:30 AM" },
    { id: 2, user: "Jane Smith", issue: "Laptop not booting", timestamp: "11:15 AM" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {queries.map((query) => (
          <div
            key={query.id}
            className="message-box p-4 bg-gray-100 rounded-md cursor-pointer"
            onClick={() => setActiveChat(query.user)}
          >
            <p className="font-semibold">{query.user}</p>
            <p className="text-sm text-gray-600">{query.issue}</p>
            <p className="text-xs text-gray-400">{query.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Update your profile information here.</p>
    </div>
  );
};

const TicketHistory = () => {
  const tickets = [
    { id: 1, user: "John Doe", issue: "Cannot connect to VPN", status: "Resolved" },
    { id: 2, user: "Jane Smith", issue: "Laptop not booting", status: "In Progress" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ticket History</h1>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="message-box p-4 bg-gray-100 rounded-md cursor-pointer">
            <p className="font-semibold">{ticket.user}</p>
            <p className="text-sm text-gray-600">{ticket.issue}</p>
            <p className="text-xs text-gray-400">Status: {ticket.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const HelpSupport = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <p>Here you can access helpful resources or contact support for assistance.</p>
    </div>
  );
};

const ChatWindow = ({ user, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { sender: "Technician", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="chat-window fixed bottom-0 right-0 w-96 bg-white shadow-lg p-4 border">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-bold">Chat with {user}</h2>
        <button onClick={onClose} className="text-red-500">Close</button>
      </div>
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.sender === "Technician" ? "text-right" : "text-left"}`}>
            <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-md">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input flex-1 border p-2 rounded-l-md"
        />
        <button onClick={sendMessage} className="send-button bg-blue-500 text-white px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>
  );
};

export default TechnicianPanel;
