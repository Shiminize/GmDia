import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} [Your Chosen Brand Name Here]. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
