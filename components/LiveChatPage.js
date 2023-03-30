import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const LiveChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // set up Socket.io connection on component mount
  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your server URL

    // handle 'connect' event
    socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    // handle 'chat message' event
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]); // add new message to messages array
    });

    // disconnect from Socket.io on component unmount
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return; // if message is empty, do nothing
    }

    const socket = io('http://localhost:3000'); // Replace with your server URL

    socket.emit('chat message', { text: message }); // emit 'chat message' event with message text
    setMessage(''); // clear input field
  };

  return (
    <div className="live-chat-page">
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className="message">
            <span className="user">{msg.user}</span>
            <span className="text">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default LiveChatPage;
