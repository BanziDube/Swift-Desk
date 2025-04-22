import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  FaUserCircle, FaComments, FaTachometerAlt,
  FaHistory, FaInfoCircle
} from "react-icons/fa";
import {
  collection, addDoc, query, where,
  orderBy, onSnapshot, serverTimestamp,
  getDocs, doc, updateDoc, getDoc
} from "firebase/firestore";
import "./technicianPanel.css";

const TechnicianPanel = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [activeChat, setActiveChat] = useState(null);
  const technicianId = "Banzi06"; // Replace with auth-based ID if needed

  return (
    <div className="technician-panel">
      <div className="sidebar">
        <FaUserCircle className="sidebar-icon" title="Profile" onClick={() => setSelectedTab("profile")} />
        <FaTachometerAlt className="sidebar-icon" title="Dashboard" onClick={() => setSelectedTab("dashboard")} />
        <FaHistory className="sidebar-icon" title="Ticket History" onClick={() => setSelectedTab("history")} />
        <FaComments className="sidebar-icon" title="Messages" onClick={() => setSelectedTab("messages")} />
        <FaInfoCircle className="sidebar-icon" title="Help & Support" onClick={() => setSelectedTab("help")} />
      </div>

      <div className="main-content">
        {selectedTab === "dashboard" && <Dashboard technicianId={technicianId} />}
        {selectedTab === "messages" && <Messages technicianId={technicianId} onOpenChat={setActiveChat} />}
        {selectedTab === "profile" && <Profile />}
        {selectedTab === "history" && <TicketHistory />}
        {selectedTab === "help" && <HelpSupport />}
        {activeChat && (
          <ChatWindow
            queryId={activeChat.id}
            sender={activeChat.sender}
            technicianId={technicianId}
            onClose={() => setActiveChat(null)}
          />
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ technicianId }) => {
  const [queries, setQueries] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    const fetchQueries = async () => {
      const q = query(collection(db, "queries"), where("technicianId", "==", technicianId));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueries(data.filter(q => q.status.toLowerCase() === filter));
    };
    fetchQueries();
  }, [filter, technicianId]);

  const markAsResolved = async (id) => {
    await updateDoc(doc(db, "queries", id), { status: "resolved" });
    setQueries(prev => prev.filter(q => q.id !== id));
    alert("Query marked as resolved!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>
      <label>Filter:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded-md">
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>

      <h2 className="text-xl font-bold mt-6">Assigned Queries</h2>
      <ul>
        {queries.map(query => (
          <li key={query.id} className="query-item">
            <p><strong>Type:</strong> {query.queryType}</p>
            <p><strong>Status:</strong> {query.status}</p>
            <p><strong>Message:</strong> {query.text}</p>
            <p><strong>Time:</strong> {query.timestamp?.seconds ? new Date(query.timestamp.seconds * 1000).toLocaleString() : "N/A"}</p>
            {query.status === "pending" && (
              <button onClick={() => markAsResolved(query.id)} className="btn-resolve">Mark as Resolved</button>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Messages = ({ onOpenChat, technicianId }) => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "queries"), where("technicianId", "==", technicianId), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueries(data);
    });
    return () => unsub();
  }, [technicianId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {queries.length > 0 ? queries.map(query => (
        <div
          key={query.id}
          className="message-box"
          onClick={() => onOpenChat({ id: query.id, sender: query.sender })}
        >
          <p className="font-semibold">{query.queryType}</p>
          <p className="text-sm">{query.text}</p>
          <p className="text-xs text-gray-400">{query.timestamp?.toDate ? new Date(query.timestamp.toDate()).toLocaleString() : "N/A"}</p>
        </div>
      )) : <p>No messages yet.</p>}
    </div>
  );
};

const ChatWindow = ({ queryId, sender, technicianId, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [originalQuery, setOriginalQuery] = useState(null);

  useEffect(() => {
    const fetchOriginalQuery = async () => {
      const docRef = doc(db, "queries", queryId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOriginalQuery(docSnap.data());
      }
    };

    const repliesRef = query(collection(db, `queries/${queryId}/replies`), orderBy("timestamp"));
    const unsub = onSnapshot(repliesRef, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    fetchOriginalQuery();

    return () => unsub();
  }, [queryId]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    await addDoc(collection(db, `queries/${queryId}/replies`), {
      sender: "Technician",
      text: message,
      technicianId,
      timestamp: serverTimestamp()
    });
    setMessage("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat with {sender}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="chat-body">
        {originalQuery && (
          <div className="chat-msg other">
            <strong>{sender}:</strong> {originalQuery.text}
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.sender === "Technician" ? "self" : "other"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const Profile = () => (
  <div>
    <h1>Profile</h1>
    <p>Update your info here.</p>
  </div>
);

const TicketHistory = () => {
  const tickets = [
    { id: 1, user: "John", issue: "VPN down", status: "Resolved" },
    { id: 2, user: "Jane", issue: "PC boot error", status: "Pending" },
  ];
  return (
    <div>
      <h1>Ticket History</h1>
      {tickets.map(t => (
        <div key={t.id} className="ticket">
          {t.user}: {t.issue} - {t.status}
        </div>
      ))}
    </div>
  );
};

const HelpSupport = () => (
  <div>
    <h1>Help</h1>
    <p>Support info here.</p>
  </div>
);

export default TechnicianPanel;
