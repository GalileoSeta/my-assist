import React from 'react';
import LiveChatPage from '../components/LiveChatComp';
import Menu from '../components/Menu';

const LiveChat = () => {
  return (
    <div>
      <Menu />
      <LiveChatPage />
      {/* Your live chat component(s) goes here */}
    </div>
  );
};

export default LiveChat;
