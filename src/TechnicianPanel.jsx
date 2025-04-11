import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { FaUserCircle, FaComments, FaTachometerAlt, FaHistory, FaInfoCircle } from "react-icons/fa";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, getDocs, doc, updateDoc } from "firebase/firestore";
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
  const [queries, setQueries] = useState([]);
  const [filter, setFilter] = useState("pending"); // Default filter is "Pending"
  const technicianId = "Banzi06"; // Replace this with dynamically fetched logged-in technician ID

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const queriesRef = collection(db, "queries");
        let q = query(queriesRef, where("technicianId", "==", technicianId));

        const querySnapshot = await getDocs(q);
        const queryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Apply filter (if filter is set)
        const filteredQueries = queryList.filter((q) => q.status.toLowerCase() === filter);
        setQueries(filteredQueries);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, [filter]); // Re-fetch when filter changes

  // Function to mark query as resolved
  const markAsResolved = async (queryId) => {
    try {
      const queryRef = doc(db, "queries", queryId);
      await updateDoc(queryRef, { status: "resolved" });

      // Update UI immediately
      setQueries((prevQueries) => prevQueries.filter((q) => q.id !== queryId));

      alert("Query marked as resolved!");
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>

      {/* Filter Dropdown */}
      <label className="mr-2">Filter by Status:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded-md">
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>

      <h2 className="text-xl font-bold mt-6">Assigned Queries</h2>
      <ul className="query-list">
        {queries.length > 0 ? (
          queries.map((query) => (
            <li key={query.id} className="query-item p-4 border rounded-md mb-4">
              <strong>Type:</strong> {query.queryType} <br />
              <strong>Priority:</strong> {query.priorityLevel} <br />
              <strong>Status:</strong> {query.status} <br />
              <strong>Message:</strong> {query.text} <br />
              <strong>Time:</strong> {new Date(query.timestamp?.seconds * 1000).toLocaleString()} <br />
              
              {/* Mark as Resolved Button */}
              {query.status === "pending" && (
                <button
                  onClick={() => markAsResolved(query.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                >
                  Mark as Resolved
                </button>
              )}
              <hr />
            </li>
          ))
        ) : (
          <p>No queries found for this status.</p>
        )}
      </ul>
    </div>
  );
};



const Messages = ({ setActiveChat }) => {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState(""); // Holds the text input value
  const [selectedQuery, setSelectedQuery] = useState(null); // Stores the selected query

  useEffect(() => {
    // Reference the "queries" collection
    const queriesRef = collection(db, "queries");

    // Fetch messages in real-time, ordered by timestamp
    const q = query(queriesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const queriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueries(queriesData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handles sending a reply
  const handleSendReply = async () => {
    if (!selectedQuery || reply.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        sender: "Technician",
        recipient: selectedQuery.sender, // Send response back to the original sender
        message: reply,
        timestamp: serverTimestamp(),
      });

      setReply(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {queries.length > 0 ? (
          queries.map((query) => (
            <div
              key={query.id}
              className="message-box p-4 bg-gray-100 rounded-md cursor-pointer"
              onClick={() => setSelectedQuery(query)}
            >
              <p className="font-semibold">{query.queryType}</p>
              <p className="text-sm text-gray-600">{query.issue || query.message || query.text || query.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(query.timestamp?.toDate()).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Reply Section */}
      {selectedQuery && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-2">Reply to {selectedQuery.sender}</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="3"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your response..."
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSendReply}
          >
            Send
          </button>
        </div>
      )}
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

const ChatWindow = ({ user, onClose, chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch existing messages for the specific chat (using chatId)
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });

    return () => unsubscribe();  // Cleanup the listener when the component unmounts
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        // Add message to Firestore "replies" collection
        await addDoc(collection(db, "replies"), {
          sender: "Technician",   // Identify the sender
          text: message,          // Message content
          timestamp: serverTimestamp(), // Store the timestamp
          chatId: chatId,         // Associate it with the correct chat
        });
  
        setMessage(""); // Clear input field after sending
      } catch (error) {
        console.error("Error adding reply: ", error);
      }
    }
  };

  return (
    <div className="chat-window fixed bottom-0 right-0 w-96 bg-white shadow-lg p-4 border">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-bold">Chat with {user}</h2>
        <button onClick={onClose} className="close-button text-red-500">Close</button>
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
