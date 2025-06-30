import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} GemDia. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
