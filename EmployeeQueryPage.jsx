import React, { useState, useEffect, useRef } from "react";
import { Menu, User, Send, Smile, Image, Plus } from "lucide-react";
import './index.css';

const EmployeeQueryPage = () => {
  const [queryType, setQueryType] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [message, setMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [file, setFile] = useState(null); // Store the selected file
  const [filePreview, setFilePreview] = useState(null); // Preview for the file
  const [showSmileMenu, setShowSmileMenu] = useState(false); // Track if smile menu is shown
  const [selectedEmoji, setSelectedEmoji] = useState(null); // Store selected emoji
  const fileInputRef = useRef(null); // Ref for the file input
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  // Handle the file input change (file selected)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile)); // Create a preview for the file
      setMessage(selectedFile.name); // Display file name in the input field
    }
  };

  // Trigger the file input when the Plus or Image icon is clicked
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleSendMessage = () => {
    if (message.trim() !== '' && queryType.trim() !== '' && priorityLevel.trim() !== '') {
      const newMessage = {
        sender: 'user',
        text: ` ${queryType}\n ${priorityLevel}\n ${message}`,
        file: filePreview, // Include file preview in the message
        emoji: selectedEmoji, // Include selected emoji (if any)
      };
      setMessageHistory((prevHistory) => [...prevHistory, newMessage]);

      // Clear input fields after sending
      setQueryType('');
      setPriorityLevel('');
      setMessage('');
      setFile(null); // Reset file after sending
      setFilePreview(null); // Clear file preview
      setSelectedEmoji(null); // Clear selected emoji
    }
  };

  // Toggle the smile menu visibility
  const toggleSmileMenu = () => {
    setShowSmileMenu(!showSmileMenu);
  };

  // Select an emoji
  const handleSelectEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji); // Append emoji to the message
    setSelectedEmoji(emoji); // Store the selected emoji
    setShowSmileMenu(false); // Hide the smile menu after selection
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

            {/* Query Type */}
            <div className="input-field">
              <label>Select Query Type:</label>
              <input
                type="text"
                placeholder="Enter query type"
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
              />
            </div>

            {/* Priority Level */}
            <div className="input-field">
              <label>Select Priority Level:</label>
              <input
                type="text"
                placeholder="Enter priority"
                value={priorityLevel}
                onChange={(e) => setPriorityLevel(e.target.value)}
              />
            </div>

            {/* Chat Box */}
            <div className="input-field">
              <label>Message:</label>
              <div className="chat-container">
                <div className="message-box">
                  <div className="message-history">
                    {messageHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`message-bubble ${msg.sender === 'user' ? 'user' : 'respondent'}`}
                      >
                        {msg.text.split('\n').map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                        {/* If there is a file, show the preview or file name */}
                        {msg.file && (
                          <div className="file-preview">
                            {msg.file.startsWith("blob") ? (
                              <img src={msg.file} alt="File preview" className="file-img" />
                            ) : (
                              <span>{msg.file}</span> // If it's just a file name, display it
                            )}
                          </div>
                        )}
                        {/* Show emoji if selected */}
                        {msg.emoji && (
                          <div className="emoji-preview">
                            <span>{msg.emoji}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messageEndRef}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input with Icons inside the left corner */}
            <div className="message-input-container">
              <div className="icon-buttons">
                {/* Plus Icon to trigger file input */}
                <Plus size={24} className="icon plus-icon" onClick={handleFileInputClick} />
                {/* Image Icon for image upload */}
                <Image size={24} className="icon image-icon" onClick={handleFileInputClick} />
                {/* Smile Icon to toggle emoji menu */}
                <Smile size={24} className="icon smile-icon" onClick={toggleSmileMenu} />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="message-input"
                placeholder="Type your message..."
              />
              <button className="submit-button" onClick={handleSendMessage}>
                <Send size={20} />
              </button>
            </div>

            {/* Emoji Menu (displayed when smile icon is clicked) */}
            {showSmileMenu && (
              <div className="emoji-menu">
                <span onClick={() => handleSelectEmoji('😀')}>😀</span>
                <span onClick={() => handleSelectEmoji('😁')}>😁</span>
                <span onClick={() => handleSelectEmoji('😂')}>😂</span>
                <span onClick={() => handleSelectEmoji('😎')}>😎</span>
                <span onClick={() => handleSelectEmoji('😍')}>😍</span>
                <span onClick={() => handleSelectEmoji('🥺')}>🥺</span>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the file input
              onChange={handleFileChange}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeQueryPage;
