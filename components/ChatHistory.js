import Head from 'next/head';
import { useState } from 'react';

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  function handleSendMessage(e) {
    e.preventDefault();
    if (messageInput.trim()) {
      setMessages([...messages, messageInput.trim()]);
      setMessageInput('');
    }
  }

  function handleInputChange(e) {
    setMessageInput(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Live Chat</title>
      </Head>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage}>
          <label>
            <input
              type="text"
              value={messageInput}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default LiveChat;
