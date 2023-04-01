import React, { useState } from 'react';
import axios from 'axios';
import ChatHistory from './ChatHistory';

const LiveChatComp = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/chatbot', { message });
      const chatResponse = {
        message,
        sentiment: response.data.sentiment,
      };
      setChatHistory([...chatHistory, chatResponse]);
      setMessage('');
    } catch (error) {
      setError('Error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Live Chat</h1>
      {error && <p>{error}</p>}
      <ChatHistory chatHistory={chatHistory} />
      {!loading && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}
            placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
        </form>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LiveChatComp;
