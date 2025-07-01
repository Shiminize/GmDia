import React from 'react';
import './Page.css';

const AboutPage: React.FC = () => {
  return (
    <div className="content-page">
      <div className="container">
      <h1>About Us</h1>
        
        <div className="content-section">
      <p>Welcome to GemDia, where modern alchemy meets personal radiance. We are dedicated to crafting exquisite, custom lab-grown diamond jewelry that tells your unique story.</p>
      <p>Our vision is to create an intuitive, visually stunning, and highly personal digital experience that empowers you to design and purchase ethically-sourced, high-quality lab diamond jewelry that reflects your unique identity and story.</p>
        </div>

        <div className="content-section">
      <h2>Our Mission</h2>
      <p>To provide accessible, sustainable, and personalized luxury jewelry, ensuring every piece is as unique as the individual who wears it.</p>
        </div>

        <div className="content-section">
      <h2>Our Values</h2>
      <ul>
        <li>Authenticity & Transparency</li>
        <li>Sustainability & Ethical Sourcing</li>
        <li>Quality Craftsmanship</li>
        <li>Customer Empowerment</li>
        <li>Innovation & Design</li>
      </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
