import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav>
      <Link href="/">
        <span className="link-text">Home</span>
      </Link>
      <Link href="/live-chat">
        <span className="link-text">Live Chat</span>
      </Link>
    </nav>
  );
};

export default Menu;
