import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    // Send message to OpenAI API
    try {
      const response = await axios.post(apiUrl, requestBody, config);
      onSend({ author: 'user', text: message });
      onSend({ author: 'bot', text: response.data.choices[0].text });
      const utterance = new SpeechSynthesisUtterance(
        response.data.choices[0].text
      );
      window.speechSynthesis.speak(utterance);
      setMessage('');
    } catch (error) {
      consoleonSend({
        author: 'bot',
        text: 'Sorry, I could not process your request at this time.',
      });
    }
  };

  const startRecording = () => {
    recognition.start();
  };

  const stopRecording = () => {
    recognition.stop();
  };

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className="icons">
        <FaMicrophone className="mic" onClick={startRecording} />
        <FaPaperPlane className="send" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatInput;
