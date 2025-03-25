import React from 'react';
 
const MessageList = ({ messages }) => {
  return (
<div className="message-list">
      {messages.map((message, index) => (
<div key={index} className="message">
          {message.type === 'text' ? (
<p>{message.text}</p>
          ) : (
<img src={message.text} alt="Uploaded" />
          )}
</div>
      ))}
</div>
  );
};
 
export default MessageList;