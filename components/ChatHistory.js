import React from 'react';

const ChatHistory = ({ chatMessages = [] }) => {
  return (
    <div className="chat-history">
      {chatMessages.map((chatMessage, index) => (
        <div key={index}>
          <div className={`chat-message ${chatMessage.sentiment}`}>
            {chatMessage.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
